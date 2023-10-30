import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { useClipboard } from '@react-native-community/clipboard';
import SoundPlayer from 'react-native-sound-player';
import Tts from 'react-native-tts';
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

  const [conversations, setConversations] = useState([
    { language: "English", trans: "hello" },
    { language: "Vietnamese", trans: "xin chào" },
    // Thêm các cặp ngôn ngữ và câu chào khác nếu cần
  ]);
  

  const [activeTrans1, setActiveTrans1] = useState(false);
  const [activeTrans2, setActiveTrans2] = useState(false);

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

  const transConversation = () => {

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
    translation(textTranslate).then(translatedText => {
      setResult(translatedText);
    }).catch(error => { console.log("useEffect translation: ", error); });
  }, [transLang2])

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

      {/* <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.row}>
            <Text style={styles.textTransInput}>{transLang1}</Text>
            <TouchableOpacity style={styles.sound} onPress={() => sound(result)}>
              <Image source={require('../../images/speaker-filled-audio-tool-primary.png')} style={styles.soundImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.transView}>
            <Text style={styles.translateOutput}>trans</Text>
          </View>
        </View>

        <View>
          <View style={styles.hrView}></View>
          <View style={styles.row}>
            <Text style={styles.textTransInput}>{transLang2}</Text>
            <TouchableOpacity style={styles.sound} onPress={() => sound(result)}>
              <Image source={require('../../images/speaker-filled-audio-tool-primary.png')} style={styles.soundImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.transView}>
            <Text style={styles.translateOutput}>trans</Text>
          </View>
        </View>

      </ScrollView> */}

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
          keyExtractor={(item) => item.trans}
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
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-deactive.png')} />
            </TouchableOpacity>
            : <TouchableOpacity style={styles.inputLanguage} onPress={() => {
              setActiveTrans1(false);
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
            }}>
              <Image style={styles.imageReverse} source={require('../../images/mic-white-deactive.png')} />
            </TouchableOpacity>
            : <TouchableOpacity style={styles.inputLanguage} onPress={() => {
              setActiveTrans2(false);
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
