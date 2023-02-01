const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    // required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 chars"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 4,
  },
  
  //
  is_admin:Boolean

});

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));


UserSchema.path("password").validate(function () {
  if (this.password != this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match");
  }
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    });
  }
});


module.exports = mongoose.model("User", UserSchema);