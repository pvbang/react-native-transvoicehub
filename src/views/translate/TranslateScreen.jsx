import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
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

const TranslateScreen = (props) => {
  const [inputLanguage, setInputLanguage] = useState('Vietnamese');
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [textTranslate, setTextTranslate] = useState('');
  const [result, setResult] = useState('');
  // const [target, setTarget] = useState('en');
  const [transPlaceholderText, setTransPlaceholderText] = useState('Nhập văn bản');

  const [transLang1, setTransLang1] = useState('');
  const [transLang2, setTransLang2] = useState('');

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
        <Text style={styles.textTop}>Translate</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <Text style={styles.textTransInput}>{transLang1}</Text>
          <TouchableOpacity style={styles.cancel} onPress={() => setTextTranslate("")}>
            <Image source={require('../../images/cancel.png')} style={styles.cancelImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.copy} onPress={() => writeToClipboard(textTranslate)}>
            <Image source={require('../../images/copy.png')} style={styles.copyImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sound} onPress={() => sound(textTranslate)}>
            <Image source={require('../../images/speaker-filled-audio-tool.png')} style={styles.soundImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.transView}>
          <TextInput
            style={styles.translateInput}
            placeholder={transPlaceholderText}
            placeholderTextColor={colors.gray}
            value={textTranslate}
            multiline={true}
            numberOfLines={1}
            onChangeText={(text) => {
              setTextTranslate(text);~

              translation(text).then(translatedText => {
                setResult(translatedText);
              }).catch(error => { console.log("onChangeText translation: ", error); });
            }}
          />
        </View>

        {!textTranslate &&
          <TouchableOpacity style={styles.paste} onPress={() => pasteFromClipboard()}>
            <Image source={require('../../images/paste.png')} style={styles.pasteImage} />
            <Text style={styles.pasteText}>Dán</Text>
          </TouchableOpacity>
        }
        {textTranslate &&
          <View>
            <View style={styles.hrView}></View>

            <View style={styles.row}>
              <Text style={styles.textTransOutput}>{transLang2}</Text>
              <TouchableOpacity style={styles.copy} onPress={() => writeToClipboard(result)}>
                <Image source={require('../../images/copy-primary.png')} style={styles.copyImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sound} onPress={() => sound(result)}>
                <Image source={require('../../images/speaker-filled-audio-tool-primary.png')} style={styles.soundImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.transView}>
              <Text style={styles.translateOutput}>{result}</Text>
            </View>

          </View>
        }
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.inputLanguage} onPress={() => {
          setChooseTrans("from");
          props.navigation.navigate('Language');
        }}>
          <Text style={styles.textLanguage}>{transLang1}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnReverse}
          onPress={() => reverseLanguage()}>
          <Image style={styles.imageReverse} source={require('../../images/reverse.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.outputLanguage} onPress={() => {
          setChooseTrans("to");
          props.navigation.navigate('Language');
        }}>
          <Text style={styles.textLanguage}>{transLang2}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default TranslateScreen;
