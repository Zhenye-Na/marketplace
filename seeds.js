var mongoose = require("mongoose"),
    Product  = require("./models/product"),
    User     = require("./models/user"),
    Comment  = require("./models/comment");

var data = [
    {
    
        title: "Apple MacBook Pro MF841LL/A 13.3-Inch Laptop with Retina Display (512 GB hard drive, 2.9 GHz dual-core Intel Core i5 processor, 8 GB 1866 MHz LPDDR3 RAM), Silver) (2015 version)",
        description: "2.9 GHz dual-core Intel Core i5 processor (Turbo Boost up to 3.3 GHz) with 3MB shared L3 cache; 8 GB 1866 MHz LPDDR3 RAM; 512 GB PCIe-based flash storage; 13.3-inch IPS Retina Display, 2560-by-1600 resolution; Intel Iris Graphics 6100; OS X El Capitan, Up to 10 Hours of Battery Life",
        hidden: false,
        image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4caa2b0c51fbb1685b0c1a6a08b74dac&auto=format&fit=crop&w=1351&q=80"
    },
    {
        title: "HP Laptop 255 G6 (1LB17UT#ABA) AMD A6-Series A6-9220 (2.5 GHz) 8 GB Memory 256 GB SSD AMD Radeon R4 Series 15.6 Windows 10 Pro 64-Bit",
        description: "Work confidently on the durable HP 255 Notebook PC. It’s equipped for business and ready for the road, with AMD A6-9220 dual-core processor, 8GB RAM, and 256GB SSD which offers speed and storage for your OS and business files. Gigabit Ethernet and 802.11ac Wi-Fi are built-in for wired and wireless networking, and Bluetooth 4.2 technology allows you to connect compatible peripherals wirelessly. When the 15.6 display with 1366x768 resolution is not enough, extend you content to external monitor or large screen TV through VGA or HDMI output. Other features include DVD writer, SD card reader, full-size island-style keyboard with numeric keypad, and more.",
        hidden: false,
        image: "https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/34-268-227-V05.jpg"
        
    }
];

function seedDB() {
    // Comment.remove({}, function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("Removed all of the users!");
    // });
    
    // remove products
    Product.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("Removed all of the products!");
        // create products
        data.forEach(function(seed){
            Product.create(seed, function(err, product) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("product added.");
                    
                    // create Comment
                    Comment.create(
                        {
                            text: "All in all, AVOID this laptop. I usually prefer writing positive reviews, but this thing is not worth your time, money, or frustration. You'll ultimately be shipping it back, so just avoid it and find something else at this price point.",
                            author: "Son Goku"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                product.comments.push(comment);
                                product.save();
                                console.log("New comment created.");
                            }
                        }
                    );
                }
            });
        });
    });
    
}

module.exports = seedDB;