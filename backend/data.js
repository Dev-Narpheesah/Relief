const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserInfo = require('./models/UserInfoModel');
const Task = require('./models/TaskModel');
const Message = require('./models/MessageModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    populateData();
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

const populateData = async () => {
    await UserInfo.deleteMany({});
    await Task.deleteMany({});
    await Message.deleteMany({});

    const user = new UserInfo({ name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/150' });
    await user.save();

    const tasks = [
        { description: 'Coordinate with local authorities' },
        { description: 'Distribute relief materials' },
        { description: 'Monitor affected areas' }
    ];
    await Task.insertMany(tasks);

    const messages = [
        { from: 'Coordinator', message: 'Meeting at 10 AM' },
        { from: 'Volunteer', message: 'Need more supplies in area 3' }
    ];
    await Message.insertMany(messages);

    console.log('Sample data populated');
    mongoose.connection.close();
};

populateData();




// const bcyrpt = require('bcryptjs');

// const data = {
//   users: [
//     {
//       fullname: 'Ayatullah',
//       email: 'admin@example.com', 
//       password: bcyrpt.hashSync('123456'),
//     //   isAdmin: true,
//     },
//     {
//       fullname: 'Muhideen',
//       email: 'muyideen@example.com',
//       password: bcyrpt.hashSync('678910'),
//     //   isAdmin: true,
//     },
//     {
//       // _id: '1',
//       name: 'Caftan fited',
//       slug: 'caftaf-slim',
//       category: 'Caftan',
//       image: '/image/s-1.jpg',
//       price: 15000,
//       countInStock: 10,
//       brand: 'Greate Cut',
//       rating: 15,
//       numReviews: 10,
//       discription: 'high quality Material',
//     },
//     {
//       // _id: '2',
//       name: 'Complete Agbada',
//       slug: 'agbada-complete',
//       category: 'Agbada',
//       image: '/image/s-2.jpg',
//       price: 15000,
//       countInStock: 0,
//       brand: 'My Style',
//       rating: 4.5,
//       numReviews: 10,
//       discription: 'high quality Material',
//     },
//     {
//       // _id: '4',
//       name: 'Trousers',
//       slug: 'trouser-design',
//       category: 'Trouser',
//       image: '/image/s-4.jpg',
//       price: 15000,
//       countInStock: 25,
//       brand: 'T F',
//       rating: 4.5,
//       numReviews: 40,
//       discription: 'high quality Material',
//     },
//     {
//       // _id: '3',
//       name: 'Senators Design',
//       slug: 'senators-design',
//       category: 'Senator',
//       image: '/image/s-3.jpg',
//       price: 15000,
//       countInStock: 20,
//       brand: 'ABS Cut',
//       rating: 4.5,
//       numReviews: 30,
//       discription: 'high quality Material',
//     },
//   ],
// };
// module.exports = data;