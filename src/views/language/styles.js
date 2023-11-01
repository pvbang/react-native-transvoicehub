import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { FullWindowOverlay } from 'react-native-screens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    back: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.back,
        borderRadius: 100,
        marginRight: 1,
        marginLeft: 3,
        zIndex: 100,
    },
    backImg: {
        width: 20,
        height: 20,
        zIndex: 99
    },

    textTop: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },

    scrollView: {
        backgroundColor: colors.white,
        padding: 15,
    },

    top: {
        height: 70,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    content: {
        // flex: 0.92,
        marginBottom: 90,
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
   
    bottom: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
    
    resultsView : {
        // height: '87%'
    },
    searchResults : {
        backgroundColor: colors.white,
        padding: 10,
        marginBottom: 75,
    },
    viewTextResults : {
        flexDirection: 'row', 
        // marginVertical: 10
    },
    textResults : {
        marginVertical: 10,
        color: colors.black,
        fontSize: 20,
        marginHorizontal: 14,
        // fontWeight: 'bold',
    },

    buttonLanguage: {
        // backgroundColor: colors.gray_white_2,
        marginHorizontal: 5,
        marginVertical: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 100
    },

    buttonMyLang: {
        backgroundColor: colors.primary,
        marginHorizontal: 5,
        marginVertical: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 100
    },
    viewMyLangTextResults : {
        flexDirection: 'row', 
        // marginVertical: 10
    },
    textMyLangResults : {
        marginVertical: 10,
        color: colors.white,
        fontSize: 20,
        marginHorizontal: 14,
        // fontWeight: 'bold',
    },
    hrView: {
        backgroundColor: colors.gray_white_2,
        width: 100,
        height: 5,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 20
    },

    chooseLangView: {
        // backgroundColor: 'red'
    },
    chooseLangText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
        marginStart: 32,
        marginVertical: 10
    },
    

    searchView: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 100,
        width: 180,
        height: 45,
        marginTop: 5,
        marginLeft: 'auto', 
        marginEnd: 13,
    },
    search : {
        flex: 1, 
        marginLeft: 10,
        fontSize: 16,
        color: colors.primary_black,
        
    },
    imgSearch: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginStart: 20
    },
    imgVoice: {
        width: 20,
        height: 20,
    },
    imgReject : {
        width: 20,
        height: 20,
        marginHorizontal: 15,
        top: 12,
    },
    imgTopLeft: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 0
    },

});

export default styles;
