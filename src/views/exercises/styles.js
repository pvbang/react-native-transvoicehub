import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

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
        flex: 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    content: {
        flex: 0.92,
    },

    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray_white,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    search: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    imgSearch: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imgVoice: {
        width: 20,
        height: 20,
    },
    imgReject: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    imgTopLeft: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 20
    },
    resultsView: {
        height: '100%'
    },
    searchResults: {
        // backgroundColor: colors.gray_search,
    },
    viewTextResults: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,

        borderRadius: 5,

        marginHorizontal: 10,
        marginTop: 10
    },
    textResults: {
        color: colors.primary,
        fontSize: 16,
        marginHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    hr: {
        // backgroundColor: colors.primary,
        height: 2,
        borderRadius: 50
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    bottom: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    column: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 9,
    },

    text: {
        color: colors.primary_black,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },

    image: {
        height: 50,
        width: 50
    },

    midView: {
        // backgroundColor: colors.black,
        margin: 20,
    },
    flatView: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 130,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.green2,
        marginBottom: 15
    },
    flatText: {
        marginHorizontal: 30,
        marginTop: 20,
        color: colors.white,
        fontSize: 16,
    },
    flatText2: {
        marginStart: 30,
        position: 'absolute',
        bottom: 27,
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },

    flatButtonView: {
        backgroundColor: colors.white,
        position: 'absolute',
        right: 30,
        bottom: 20,
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 100
    },
    flatButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold'
    }


});

export default styles;
