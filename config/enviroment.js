

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'aRR2bQtvXVt2mOqqNUpuDLpLz04ovBwE',
    db: 'codialdevelopment2',
    smtp: {
        service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'raghavgoyaldbd478', // generated ethereal user
        pass: 'Raghav@905', // generated ethereal password
      },
    },
    google_client_id: '653658542749-02gcnsuqq86j22sk3iukf02jfoh9h4bt.apps.googleusercontent.com',
    google_client_secret: 'LYocvivDyTroCWXobQMyMKm2',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:  'codial',
}


const production =  {
    name: process.env.enviroment,
    asset_path:process.env.assets_path ,
    session_cookie_key: process.env.session_cookie_key,
    db: process.env.db,
    smtp: {
        service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.user, // generated ethereal user
        pass: process.env.pass, // generated ethereal password
      },
    },
    google_client_id: process.env.google_client_id,
    google_client_secret:process.env.google_client_secret,
    google_call_back_url:process.env.google_call_back_url,
    jwt_secret:  process.env.jwt_secret
}



module.exports =development;