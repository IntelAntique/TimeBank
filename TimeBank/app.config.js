import dotenv from 'dotenv';

dotenv.config();

export default ({ config }) => ({
    ...config,
    ios: {
        supportsTablet: true,
        config: {
            googleMapsApiKey: process.env.MAPS_API_KEY,
        },
    },
    android: {
        package: "com.company.myapp",
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        config : {
            googleMaps: {
                apiKey: process.env.MAPS_API_KEY
            }
        }
    }
});
