import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "updatedOn",
    },
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.pre("findOneAndUpdate", function (next) {
    if (!this._update.password) return next();
    bcrypt.hash(this._update.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this._update.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        else {
            if (!isMatch) return cb(null, isMatch);
            return cb(null, this);
        }
    });
};

const User = mongoose.model("User", userSchema);

export default User;