const CourseModel = require("../../models/course");
const UserModel = require("../../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const cloudinary = require("cloudinary");



class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      res.render("admin/dashboard",{n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };
  static studendtDisplay = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      const data = await UserModel.find();
      // console.log (data)
      res.render("admin/studentDisplay", { d: data ,n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };
  static studentView = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      //console.log(req.params.id);
      const id = req.params.id;
      const data = await UserModel.findById(id);
      //Console.log(data);
      res.render("./admin/studentView", { d: data ,n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };
  static studentDelete = async (req, res) => {
    try {
      
      //console.log(req.params.id)
      const id = req.params.id;
      const data = await UserModel.findByIdAndDelete(id);
      res.redirect("/admin/studentDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static studentEdit = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      //console.log(req.params.id);
      const id = req.params.id;
      const data = await UserModel.findById(id);
      //Console.log(data);
      res.render("admin/studentEdit", { d: data ,n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };
  static studentUpdate = async (req, res) => {
    try {
      
      //console.log(req.body);
      const id = req.params.id;
      const { name, email, password } = req.body;
      await UserModel.findByIdAndUpdate(id, {
        name,
        email,
        password,
      });
      res.redirect("/admin/studentDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static studentInsert = async (req,res) =>{
    try {
      
      // console.log(req.body)
      const { name, email, password } = req.body
       await UserModel.create({
        name,
        email,
        password
      });
      res.redirect('/admin/studentDisplay'); //route path
    } catch (error) {
      console.log(error);
    }
  };
  static courseDisplay = async (req,res) =>{
    try {
      const { name, image } = req.userdata;
     const course = await CourseModel.find()
     //console.log(course)
    res.render('admin/courseDisplay',{c:course,n:name,i:image})
    } catch (error) {
      console.log(error);
    }
  };
  static update_status = async (req, res) => {
    try {
      
      //console.log(req.body);
      const id = req.params.id;
      const { name, email,status,comment,course } = req.body;
      await CourseModel.findByIdAndUpdate(id, {
        status,
        comment,
      });
      this.sendEmail(name,email,course,status,comment)
      res.redirect("/admin/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email,status,comment,course) => {
    //console.log(name, email, course);
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "dileepmeena975@gmail.com",
        pass: "hhxi lhse vmby kbzf", 
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: ` Course ${course} ${status} ` , // Subject line
      text: "heelo", // plain text body
      html: `<b>${name}</b> Course  <b>${course}</b> ${status} successful! ${comment} <br>
                 `, // html body
    });
  };

  static profile = async (req, res) => {
    try {
      const { name, image, email, id } = req.userdata;
      res.render("admin/profile", { n: name, i: image, e: email });
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.userdata;
      const { name, email, role } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

static password = async(req , res)=>{
  try {
    const { name , image }= req.userdata
res.render('admin/password',{n:name, i:image})

  } catch (error) {
    console.log(error)
  }
}

static changePassword = async (req, res) => {
    try {
      const { id } = req.userdata;
      // console.log(req.body)
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/admin/Password");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/admin/Password");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/admin/Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

}
module.exports = AdminController;
