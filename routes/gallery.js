var express = require('express');
var router = express.Router();
var upload = require('./pool');
var upload = require('./multer');
var pool = require('./pool');



//  calling event gallery function
router.get('/gallery', function (req, res) {
    pool.query("select * from eventsgallerypic", function (error, result) {
        if (error) {
            console.log(error)
            res.status(200).json({ data: '', 'message': 'server error' })
        }
        else {

            res.status(200).json({ status: true, data: result, 'message': 'fetched success' })

            // res.send(result)
        }

    });
});

// image section

// router.get('/img', function (req, res) {
//     res.render('imginsert', { message: '' })
// });

// router.post('/uploadimg', upload.array('files', 50), (req, res) => {
//     const files = req.files;
//     if (!files) {

//          res.render('imginsert',{'message':'server error'})
//     }
//     pool.query('insert into album2k18 (picname, picsize, picmime) VALUES ?', [files.map(file => [file.originalname, file.size, file.mimetype])], (error, result) => {
//       if (error) {
//         console.log(error)
//         res.render('imginsert',{'message':'server error'})
//       }
//       console.log(result)
//       res.render("imginsert",{result:result,message:"Record submitted successfully"})
//     });
//   });








// admin upload image function
// router.get("/slider", (req, res) => {
//     var admin = JSON.parse(localStorage.getItem('ADMIN'))
//     if (admin)
//         res.status(200).json({ message: '' })
//     else
//         res.status(200).json({ message: '' })
// });
// admin upload image method
// router.post("/upload",upload.single("formFile"),(req,res)=>{
//     var admin=JSON.parse(localStorage.getItem('ADMIN'))
//     if(!admin)
//     {
//         res.render('adminlogin',{message:''})
//     }
//     else
//     console.log("BODY",req.body)
//     console.log("FILE",req.file)
//     pool.query("insert into eventsgallerypic (picture)values(?)",[req.file.originalname],(error,result)=>{

//         if(error)
//         {
//             console.log(error)
//             res.render('sliderimage',{'message':'server error'})
//         }
//         else
//         {
//             console.log(result)
//             res.render("sliderimage",{result:result,message:"Record submitted successfully"})
//         }

//         }) 

// });


router.post('/upload', upload.array('files', 10), (req, res) => {
    const files = req.files;
    if (!files) {
        // console.log(error)
        res.status(200).json({ 'message': 'server error' })
    }

    // insert file data into MySQL database
    pool.query('insert into eventsgallerypic (picture, picsize, picmime) VALUES ?', [files.map(file => [file.originalname, file.size, file.mimetype])], (error, result) => {
        if (error) {
            res.status(200).json({ 'message': 'server error' })
        }
        console.log(result)
        res.status(200).json({ data: result, message:"Record submitted successfully" })
    });
});






// render admin page
// router.get('/admin', (req, res) => {
//     var admin = JSON.parse(localStorage.getItem('ADMIN'))
//     if (!admin) {
//         res.status(200).json({ message: '' })
//     }
//     else
//         res.status(200).json({ data: 'result' })
// });


// Table of all images
router.get('/display_technoparv_carousel_img', (req, res) => {
   
  
        pool.query("select * from technoparvcarousel", (error, result) => {
            if (error) {
                console.log(error)
                res.status(200).json({ 'data': [], 'message': 'server error' })
            }
            else {
               console.log(result)
                res.status(200).json({ data:result, 'message': 'fetched success' })


            }
        })
})



// router.get('/sliderupdate',(req,res)=>{
//     res.redirect('/event/editslider')
// });


router.get('/searchbyid', (req, res) => {
   
        pool.query("select * from eventsgallerypic where pic_id=?", [req.query.pid], (error, result) => {
            if (error) {
                console.log(error)
                res.status(200).json({ 'data': [], 'message': 'server error' })
            }
            else {

                res.status(200).json({ data: result[0], 'message': 'fetched success' })


            }
        })
});

router.post("/updatetechnoparvcarousel", upload.single("formFile"), (req, res) => {
    var admin = JSON.parse(localStorage.getItem('ADMIN'))
   
   
    pool.query("update technoparvcarousel set slidepicl=? where slideid=?", [req.file.originalname, req.body.imgid], (error, result) => {

        if (error) {
            console.log(error)
            res.status(200).json({ 'data': [], 'message': 'server error' })
        }
        else {

            res.status(200).json({ data: result[0], 'message': 'fetched success' })


        }

    })

});

router.post("/delete_technoparv_img", (req, res) => {
   
      
    pool.query("delete from technoparvcarousel where slideid=?", [req.body.slideid], (error, result) => {

        if (error) {
            console.log(error)
            res.status(200).json({ 'data': [], 'message': 'server error' })
        }
        else {

            res.status(200).json({ 'message': ' deleted success' })


        }

    });

});

// images

// router.get('/fetchtable',(req,res)=>{

//     pool.query("SHOW TABLES FROM gallery",(error,result)=>{
//         if(error)
//         {
//             console.log(error)
//             res.render('alltables',{'message':'server error'})
//         }
//         else
//         {

//             res.render('alltables',{data:result[0],'message':'fetched success'})


//         }

// })
// });

// router.post('/uploadimg', upload.array('files', 500), (req, res) => {
//     const files = req.files;
//     const table = req.body.table;
//     if (!files || !table) {
//         res.status(200).json({ 'message': 'server error' })
//     }
//     pool.query(`INSERT INTO ${table} (picname, picsize, picmime) VALUES ?`, [files.map(file => [file.originalname, file.size, file.mimetype])], (error, result) => {
//         if (error) {
//             console.log(error)
//             res.status(200).json({ 'message': 'server error' })
//         }
//         console.log(result)
//         res.status(200).json({ data: result, message: "Record submitted successfully" })
//     });
// });


router.post('/uploadimg', upload.any(), (req, res) => {
    const files = req.files;
    const table = req.body.table;
    console.log('table :', table)
    if (!files || !table) {
        res.status(200).json({ 'message': 'server error' })
    }
    pool.query(`INSERT INTO ${table} (picname, picsize, picmime) VALUES ?`, [files.map(file => [file.originalname, file.size, file.mimetype])], (error, result) => {
        if (error) {
            console.log(error)
            res.status(200).json({ status: false, 'message': 'server error' })
        }
        console.log(result)
        res.status(200).json({ status: true, data: result, message: "Record submitted successfully" })

    })

});
//  ###################USED FOR SLIDERS IMAGES SUBMIT####################
router.post('/slider_submit', upload.any(), (req, res) => {
    const files = req.files;
    const table = req.body.table;
    console.log('table :', table)
    if (!files || !table) {
        res.status(200).json({ 'message': 'server error' })
    }
    pool.query(`INSERT INTO ${table} (slidepicl, submitedat, updatedat, submitedby) VALUES (?,?,?,?)`, [files.map(file => [file.originalname]), req.body.submitedat, req.body.updatedat, req.body.submitedby], (error, result) => {
        if (error) {
            console.log(error)
            res.status(200).json({ status: false, 'message': 'server error' })
        }
        console.log(result)
        res.status(200).json({ status: true, data: result, message: "Record submitted successfully" })

    })

});
// ##################################################################################################

router.get('/fetchTechnoparvCarouselImg', (req, res) => {


    pool.query("select * from technoparvcarousel", function (error, result) {
        if (error) {
            console.log(error)
            res.status(200).json({ 'data': [], 'message': 'server error' })
        }
        else {

            res.status(200).json({ data: result, 'message': 'fetched success' })


        }
    })
});



module.exports = router