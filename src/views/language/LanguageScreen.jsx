import { Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';
import languageList from '../../constants/language.json';

const LanguageScreen = (props) => {

    const words = Object.keys(languageList);
    const [searchResults, setSearchResults] = useState(words);

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
            </View>

            {/* <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

            </ScrollView> */}

            <View style={styles.resultsView}>
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity style={styles.buttonLanguage} onPress={() =>
                                props.navigation.navigate('Meaning', {
                                    data: item,
                                })
                            }>
                                <View style={styles.viewTextResults}>
                                    <Text style={styles.textResults}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.hr}></View>
                        </View>
                    }
                    keyExtractor={(item) => item.toString()}
                    style={styles.searchResults}
                />
            </View>


        </View >
    );
};

export default LanguageScreen;
