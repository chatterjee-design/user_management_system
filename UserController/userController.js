const UserModel = require("../UserModel/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// Create a new User by registering user details
const signUp = async (req, res) => {
  try {
    // this objects are from request
    const { email, password, name, bio, username } = req.body;

    // every field is required
    if (!email || !password || !name || !bio || !username) {
      console.log("Please enter");
      res.status(400).json({
        success: false,
        message: `Every field is required`,
      });
    }

    //validate email using npm package "email-validator"
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      console.log("valid email");
      //if email is not valid
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address 📩",
      });
    }

    //if email is not unique
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      console.log(`userexist ${userExists}`);
      //if user exists
      return res.status(400).json({
        success: false,
        message: `Account already exist with the provided email ${email} 😒`,
      });
    }

    //create the user information by schema structure from request parameters
    
    console.log(req.body);
  
    
    // Create new user
    const userInfo = await UserModel.create(req.body);
    // success message
    console.log(`successMessage`);
    return res.status(200).json({
      success: true,
      message: "you have successfully registered",
    });
  } catch (err) {
    console.log("errorMessage", err);
    // if email is not unique
    // if (err.code === 11000) {

    //     //this is a error code that checks if the email is unique or not
    //     //or u can just hndle it by  const userExists = await User.findOne({ email }); on the try section

    //     return res.status(400).json({
    //       success: false,
    //       message: `Account already exist with the provided email ${email} 😒`
    //     });
    //   }

    //if there was any other error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// create a login form
const signIn = async (req, res) => {
  try {
    // this objects are from request
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Received Sign In Request:", req.body); // Log the request body
      return res.status(400).json({
        success: false,
        message: `Every field is required`,
      });
    }

    // check user exist or not
    const user = await UserModel.findOne({
      // find this {email: email} and password
      email,
    }).select("+password");

    // If user is null or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("User not found"); // Log user not found
      // check db password and password from request body is same or not
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    // Create jwt token using userSchema method( jwtToken() )
    const token = user.jwtToken();
    user.password = undefined;

    //set cookie's security and age
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000, //24hr
      httpOnly: true, //  not able to modify  the cookie in client side
    };
    console.log("Generated Token:", token);
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Sign In Error:", err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    console.log(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//logout user
const logOut = async (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(), // current expiry date
      httpOnly: true, //  not able to modify  the cookie in client side
    };

    // return response with cookie without token
    res.cookie("token", null, cookieOption);

    res.status(200).json({
      success: true,
      message: "logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { signUp, signIn, getUser, logOut };
