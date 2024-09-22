const jwt = require('jsonwebtoken');

const generateTokenSetCookie = (res, user) => {
    const token = jwt.sign({
        userId: user.id,
        role: user.role,
        username: user.username,
    }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });

    return token;
};

const refreshTokenAPI = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: 'No token in cookies session'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                message: 'Token is expired or invalid'
            });
        }

        const user = {
            id: decodedToken.userId,
            role: decodedToken.role,
            username: decodedToken.username,
        };

        const generateNewUserToken = generateTokenSetCookie(res, user);

        return res.status(200).json({
            user,
            token: generateNewUserToken
        });
    });
}

module.exports = {
    generateTokenSetCookie,
    refreshTokenAPI
}