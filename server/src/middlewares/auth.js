import { verifyToken } from '../utils/jwt.js';


export const auth = (req, res, next) => {
const header = req.headers['authorization'];
if (!header) return res.status(401).json({ success: false, message: 'No token' });


const [type, token] = header.split(' ');
if (type !== 'Bearer' || !token) {
return res.status(401).json({ success: false, message: 'Invalid token format' });
}
try {
const payload = verifyToken(token);
req.user = { id: payload.id, email: payload.email, name: payload.name };
next();
} catch (err) {
return res.status(401).json({ success: false, message: 'Token invalid or expired' });
}
};