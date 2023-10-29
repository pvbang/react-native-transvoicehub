import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';
import languageLists from '../../constants/language.json';

const LanguageScreen = (props) => {

    const [chooseTrans, setChooseTrans] = useState('');
    const [targetLang, setTargetLang] = useState('');
    const [transLang1, setTransLang1] = useState('');
    const [transLang2, setTransLang2] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(words);
    const [showResults, setShowResults] = useState(false);

    const words = Object.keys(languageLists);
    const [languageList, setLanguageList] = useState(words);

    const getTransLanguage = async () => {
        try {
            const chooseTrans = await AsyncStorage.getItem('@chooseTrans')
            const transLang1 = await AsyncStorage.getItem('@transLang1')
            const transLang2 = await AsyncStorage.getItem('@transLang2')

            setChooseTrans(chooseTrans);
            setTransLang1(transLang1);
            setTransLang2(transLang2);
            if (chooseTrans === "from") {
                setTargetLang(transLang1);
                const index = languageList.indexOf(transLang1);

                if (index !== -1) {
                    languageList.splice(index, 1);
                    languageList.unshift(transLang1);

                    setLanguageList(languageList);
                    console.log(languageList);
                }

            } else if (chooseTrans === "to") {
                setTargetLang(transLang2);
                const index = languageList.indexOf(transLang2);

                if (index !== -1) {
                    languageList.splice(index, 1);
                    languageList.unshift(transLang2);

                    setLanguageList(languageList);
                    console.log(languageList);
                }
            } else {
                setTargetLang('');
            }

        } catch (e) {
            console.log(e)
        }
    }

    const setTransLanguage1 = async (transLang1) => {
        try {
            await AsyncStorage.setItem('@transLang1', transLang1)
        } catch (e) {
            console.log(e)
        }
    }

    const setTransLanguage2 = async (transLang2) => {
        try {
            await AsyncStorage.setItem('@transLang2', transLang2)
        } catch (e) {
            console.log(e)
        }
    }

    const filterData = (value) => {
        const filteredData = languageList.filter((item) =>
            item.toLowerCase().includes(value.toString().toLowerCase())
        );
        setSearchResults(filteredData);
        setShowResults(true);

        if (!value) {
            setShowResults(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults(words);
        setShowResults(false);
    }

    useEffect(() => {
        getTransLanguage();

    }, [])


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
                <Text style={styles.textTop}>Language</Text>

                <View style={styles.searchView}>
                    <Image source={require('../../images/search.png')} style={styles.imgSearch} />
                    <TextInput
                        style={styles.search}
                        placeholder="Tìm kiếm ngôn ngữ"
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            filterData(text);
                        }}
                    />
                    {showResults && (
                        <TouchableOpacity onPress={clearSearch}>
                            <Image source={require('../../images/reject.png')} style={styles.imgReject} />
                        </TouchableOpacity>
                    )}

                </View>

            </View>

            <View style={styles.resultsView}>
                <FlatList
                    data={showResults === true ? searchResults : languageList}
                    renderItem={({ item }) => (
                        <View>
                            {item === languageList[0] ? <View style={styles.chooseLangView}><Text style={styles.chooseLangText}>Ngôn ngữ đang chọn</Text></View> : <View></View>}
                            <TouchableOpacity
                                style={item === targetLang ? styles.buttonMyLang : styles.buttonLanguage}
                                onPress={() => {
                                    chooseTrans === "from" ? setTransLanguage1(item) : setTransLanguage2(item);
                                    props.navigation.goBack(() => {
                                        getTransLanguage();
                                    });
                                }}
                            >
                                <View style={item === targetLang ? styles.viewMyLangTextResults : styles.viewTextResults} >
                                    <Text style={item === targetLang ? styles.textMyLangResults : styles.textResults}>
                                        {item}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            {item === languageList[0] ?
                                <View style={styles.chooseLangView}>
                                    <View style={styles.hrView}></View>
                                    <Text style={styles.chooseLangText}>Tất cả ngôn ngữ</Text>
                                </View> : <View></View>
                            }

                            <View style={styles.hr}></View>
                        </View>
                    )}
                    keyExtractor={(item) => item}
                    style={styles.searchResults}
                />
            </View>
        </View >
    );
};

export default LanguageScreen;
