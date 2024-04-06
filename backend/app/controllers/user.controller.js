import User from "../models/user.model.js";
import { createToken } from "../middleware/user.middleware.js";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        const token = createToken(user);
        return res.status(201).json({ token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ message: "Need email and password to login" });
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(404)
                .json({ message: "User with email does not exist" });
        user.comparePassword(password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch)
                return res
                    .status(400)
                    .json({ message: "Incorrect password" });
            const token = createToken(user);
            return res.status(200).json({ token });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export default {
    register,
    login
};