
const ContactModel = require('../models/contact')
class ContactContoller {

    static contactinsert = async (req, res) => {
        try {
            // console.log(req.body)
            const { id } = req.userdata
            const { name, email, phone, message } = req.body
            if (!phone || !message) {
                req.flash("error", "All Fields are Required.");
                return res.redirect("/contact");
            }
            const result = new ContactModel({
                name: name,
                email: email,
                phone: phone,
                message: message,
                user_id: id
            })
            await result.save()
            req.flash('success', 'Thanks for contacting us. Please wait we will connect you soon!')
            res.redirect('/contact')
        } catch (error) {
            console.log(error)
        }
    }
    // static contactdisplay = async(req,res)=>{
    //     try {
    //         const {name,image,id}=req.userdata
    //         const contact = ContactModel.find({user_id:id}) 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    
}
module.exports = ContactContoller