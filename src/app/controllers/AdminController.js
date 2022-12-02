const Admin = require('../models/admin');
const mongooseHelper = require('../util/mongoose');
const Client = require('../models/employee');
const Employee = require('../models/employee');
const adminHelper = require('../util/adminHelper');
const Service = require('../models/service');


class AdminController {
    // get interface
    //[GET] /admin
    async interface(req, res, next) {
        try {

            let Clients = mongooseHelper.multiMongooseToObject(await Client.find());
            let Employees = mongooseHelper.multiMongooseToObject(await Employee.find());
            let Services = mongooseHelper.multiMongooseToObject(await Service.find());
            let ad = await Admin.findOne({ _id: req.params.id });
            ad = mongooseHelper.mongoosesToObject(ad);
            res.render("admin", {
                title: `Admin: ${req.params.id}`,
                admin: ad,
                ListClient: adminHelper.getListClient(Clients),
                ListEmployee: adminHelper.getListEmployee(Employees),
                ListService: adminHelper.getListService(Services),
            });
        }
        catch (err) {
            next(err);
        }

    }

    // [POST] /admin/login
    checkLogin(req, res, next) {
        Admin.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(admin => {
            if (admin == null) {
                res.render('login', {
                    notification: "Nhập sai email hoặc mật khẩu!",
                })
            }
            else {
                let obj = mongooseHelper.mongoosesToObject(admin);
                res.redirect(`/admin/${obj._id}`);
            }
        })
            .catch(next);
    }
}

module.exports = new AdminController();
