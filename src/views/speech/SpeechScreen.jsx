import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { useClipboard } from '@react-native-community/clipboard';
import SoundPlayer from 'react-native-sound-player';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';
import languageLists from '../../constants/language.json';

const SpeechScreen = (props) => {
  const [inputLanguage, setInputLanguage] = useState('Vietnamese');
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [textTranslate, setTextTranslate] = useState('');
  const [result, setResult] = useState('');
  // const [target, setTarget] = useState('en');
  const [transPlaceholderText, setTransPlaceholderText] = useState('Nhập văn bản');

  const [transLang1, setTransLang1] = useState('');
  const [transLang2, setTransLang2] = useState('');

  const [conversations, setConversations] = useState([]);

  const [activeTrans1, setActiveTrans1] = useState(false);
  const [activeTrans2, setActiveTrans2] = useState(false);

  const [lastVoiceLang, setLastVoiceLang] = useState('');

  // const [dataClipboard, setStringClipboard] = useClipboard();

  const pasteFromClipboard = async () => {
    let clipboardContent = await Clipboard.getString();
    setTextTranslate(clipboardContent);
  };

  const writeToClipboard = async (text) => {
    Clipboard.setString(text);
  };

  const translation = (text) => {
    var target = languageLists[transLang2];
    console.log("target: ", target);

    return new Promise((resolve, reject) => {
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${strings.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: target
        }),
      })
        .then(response => response.json())
        .then(data => {
          const translatedText = data.data.translations[0].translatedText;
          resolve(translatedText);
        })
        .catch(error => {
          console.log("error?: ", error);
        });
    });
  };

  const reverseLanguage = () => {
    const temp = transLang1;
    setTransLang1(transLang2);
    setTransLang2(temp);

    setTransLanguage(transLang1, transLang2);
  }

  const sound = (text) => {
    try {
      Tts.speak(text);
    } catch (e) {
      console.log("sound: ", e)
    }
  }

  const setChooseTrans = async (chooseTrans) => {
    try {
      await AsyncStorage.setItem('@chooseTrans', chooseTrans)
    } catch (e) {
      console.log("setChooseTrans: ", e)
    }
  }

  const getTransLanguage = async () => {
    try {
      var _transLang1 = await AsyncStorage.getItem('@transLang1')
      var _transLang2 = await AsyncStorage.getItem('@transLang2')

      if (_transLang1) {
        setTransLang1(_transLang1);
      } else {
        setTransLang1(inputLanguage);
        _transLang1 = inputLanguage;
      }

      if (_transLang2) {
        setTransLang2(_transLang2);
      } else {
        setTransLang2(outputLanguage);
        _transLang2 = outputLanguage;
      }

      setTransLanguage(_transLang1, _transLang2);
    } catch (e) {
      console.log("getTransLanguage: ", e)
    }
  }

  const setTransLanguage = async (transLang1, transLang2) => {
    try {
      await AsyncStorage.setItem('@transLang1', transLang1)
      await AsyncStorage.setItem('@transLang2', transLang2)
    } catch (e) {
      console.log("setTransLanguage: ", e)
    }
  }

  useEffect(() => {
    getTransLanguage();
  }, [])

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getTransLanguage();
    });
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    translation(textTranslate).then(translatedText => {
      setResult(translatedText);
    }).catch(error => { console.log("useEffect translation: ", error); });
  }, [transLang2])

  const speechStartHandler = e => {
    console.log('start record', e);
  };
  const speechEndHandler = e => {
    setActiveTrans1(false);
    setActiveTrans2(false);
    console.log("lastVoiceLang: ", lastVoiceLang);
    console.log('stop record', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    console.log("lastVoiceLang: ", lastVoiceLang);
    const newConversation = { language: lastVoiceLang, trans: text };
    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
   
    console.log("text record: ", text);
  };

  const startRecording1 = async () => {
    try {
      var target = languageLists[transLang1];
      await Voice.start(target);
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error', error);
    }
  };

  const startRecording2 = async () => {
    try {
      var target = languageLists[transLang2];
      await Voice.start(target);
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.primary} barStyle='light-content' />

      <View style={styles.top}>
        <TouchableOpacity style={styles.back}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../images/back_white.png')} style={styles.backImg} />
        </TouchableOpacity>
        <Text style={styles.textTop}>Speech</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <View>
              <View style={styles.row}>
                <Text style={styles.textTransInput}>{item.language}</Text>
                <TouchableOpacity style={styles.sound} onPress={() => sound(item.trans)}>
                  <Image source={require('../../images/speaker-filled-audio-tool-primary.png')} style={styles.soundImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.transView}>
                <Text style={styles.translateOutput}>{item.trans}</Text>
              </View>
              <View style={styles.hrView}></View>
            </View>

          )}
          keyExtractor={(item) => item.trans + Math.floor(Math.random() * 999999)}
          style={styles.searchResults}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.lang}>
          <TouchableOpacity onPress={() => {
            setChooseTrans("from");
            props.navigation.navigate('Language');
          }} style={styles.textLanguageView}>
            <Text style={styles.textLanguage}>{transLang1}</Text>
          </TouchableOpacity>

          {activeTrans1 === false ?
            <TouchableOpacity style={styles.outputLanguage} onPress={() => {
              setActiveTrans1(true);
              setLastVoiceLang(transLang1);
              startRecording1();
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-deactive.png')} />
            </TouchableOpacity>
            : <TouchableOpacity style={styles.inputLanguage} onPress={() => {
              setActiveTrans1(false);
              setLastVoiceLang(transLang1);
              stopRecording();
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-active.png')} />
            </TouchableOpacity>
          }
        </View>

        <View style={styles.lang}>
          <TouchableOpacity onPress={() => {
            setChooseTrans("to");
            props.navigation.navigate('Language');
          }} style={styles.textLanguageView}>
            <Text style={styles.textLanguage}>{transLang2}</Text>
          </TouchableOpacity>

          {activeTrans2 === false ?
            <TouchableOpacity style={styles.outputLanguage} onPress={() => {
              setActiveTrans2(true);
              setLastVoiceLang(transLang2);
              startRecording2();
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-deactive.png')} />
            </TouchableOpacity>
            : <TouchableOpacity style={styles.inputLanguage} onPress={() => {
              setActiveTrans2(false);
              setLastVoiceLang(transLang2);
              stopRecording();
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-active.png')} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View >
  );
};

export default SpeechScreen;
