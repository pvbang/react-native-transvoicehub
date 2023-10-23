import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { useClipboard } from '@react-native-community/clipboard';
import SoundPlayer from 'react-native-sound-player';
import Tts from 'react-native-tts';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const TranslateScreen = (props) => {
  const [inputLanguage, setInputLanguage] = useState('Vietnamese');
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [textTranslate, setTextTranslate] = useState('');
  const [result, setResult] = useState('');
  const [target, setTarget] = useState('en');
  const [transPlaceholderText, setTransPlaceholderText] = useState('Nhập văn bản');

  const [dataClipboard, setStringClipboard] = useClipboard();

  const pasteFromClipboard = async () => {
    let clipboardContent = await Clipboard.getString();
    setTextTranslate(clipboardContent);
  };

  const writeToClipboard = async (text) => {
    Clipboard.setString(text);
  };

  const translation = (text) => {
    return new Promise((resolve, reject) => {
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${strings.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: target,
        }),
      })
        .then(response => response.json())
        .then(data => {
          const translatedText = data.data.translations[0].translatedText;
          resolve(translatedText);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const reverseLanguage = () => {
    if (inputLanguage == "English") {
      setInputLanguage("Vietnamese");
      setOutputLanguage("English");
      setTarget('en');
      setTransPlaceholderText("Nhập văn bản");
    } else {
      setInputLanguage("English");
      setOutputLanguage("Vietnamese");
      setTarget('vi');
      setTransPlaceholderText("Enter text");
    }
  }

  const sound = (text) => {
    try {
      Tts.speak(text);
    } catch (e) {
      console.log(e)
    }
  }

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
          <Text style={styles.textTransInput}>{inputLanguage}</Text>
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
              setTextTranslate(text);

              translation(text).then(translatedText => {
                setResult(translatedText);
              }).catch(error => { console.log(error); });
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
              <Text style={styles.textTransOutput}>{outputLanguage}</Text>
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
        <TouchableOpacity style={styles.inputLanguage} onPress={() => props.navigation.navigate('Language')}>
          <Text style={styles.textLanguage}>{inputLanguage}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnReverse}
          onPress={() => reverseLanguage()}>
          <Image style={styles.imageReverse} source={require('../../images/reverse.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.outputLanguage}>
          <Text style={styles.textLanguage}>{outputLanguage}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default TranslateScreen;
