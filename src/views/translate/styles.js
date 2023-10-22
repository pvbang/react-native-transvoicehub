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

    translateInput : {
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 30,
        color: colors.primary_black,
        fontWeight: 'bold',
    },

    translateOutput : {
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 30,
        color: colors.primary,
        fontWeight: 'bold',
    },

    textTransInput: {
        fontSize: 17,
        color: colors.primary_black,
        marginStart: 20,
        marginTop: 10
    },

    textTransOutput: {
        fontSize: 17,
        color: colors.primary,
        marginStart: 20,
        marginTop: 20
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
   
    paste: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: colors.gray_white,
        paddingHorizontal: 25,
        width: 100,
        height: 45,
        borderRadius: 100,
        marginStart: 17,
        marginTop: 40
    },
    pasteImage: {
        width: 20,
        height: 20,
    },
    pasteText: {
        color: colors.primary_black,
        marginLeft: 5
    },
    cancel: {
        width: 14,
        height: 14,
        position: 'absolute',
        right: 117,
        bottom: 0
    },
    cancelImage: {
        width: 14,
        height: 14,
    },
    copy: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: 70,
        bottom: -1,
    },
    copyImage: {
        width: 18,
        height: 18,
    },
    sound: {
        width: 22,
        height: 22,
        position: 'absolute',
        right: 20,
        bottom: -3
    },
    soundImage: {
        width: 22,
        height: 22,
    },

    transView: {
        marginTop: 0,
        // borderWidth: 20, 
        borderColor: colors.white, 
        // borderRadius: 1,
        // elevation: 1,
        // shadowColor: colors.primary_black, 
        // shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5, 
        padding: 10,
        // shadowRadius: 10,
    },

    hrView: {
        backgroundColor: colors.gray_white_2,
        width: 200,
        height: 3,
        borderRadius: 5,
        alignSelf: 'center',
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
    inputLanguage: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 10,
        margin: 15,
    },
    imageReverse: {
        height: 25,
        width: 25
    },
    outputLanguage: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 10,
        margin: 15,
    },
    textLanguage: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold',
    }
    
});

export default styles;
