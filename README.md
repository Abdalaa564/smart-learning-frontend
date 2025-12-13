# Smart Learning - Frontend Application

## 📋 Project Overview

Smart Learning Frontend is an interactive web application built using **Angular 20**, providing a modern and user-friendly interface for an e-learning management system. The application supports course management, lessons, quizzes, virtual meetings, and live chat.

## 🏗️ Project Structure

```
Front/
│
├── src/
│   ├── app/
│   │   ├── components/           # 31 main components
│   │   │   ├── home/            # Home page
│   │   │   ├── login/           # Login
│   │   │   ├── register/        # Registration
│   │   │   ├── courses/         # Course display
│   │   │   ├── lessons/         # Lesson management
│   │   │   ├── chat-rome/       # Chat system
│   │   │   ├── jitsi/           # Virtual meetings
│   │   │   ├── quiz-*/          # Quiz system
│   │   │   ├── user-profile/    # User profile
│   │   │   ├── instructor-*/    # Instructor management
│   │   │   ├── admin/           # Admin panel
│   │   │   └── ...              # Other components
│   │   │
│   │   ├── Services/            # Services
│   │   ├── models/              # Data models
│   │   ├── guard/               # Route Guards
│   │   ├── interceptor/         # HTTP Interceptors
│   │   ├── pipes/               # Custom Pipes
│   │   ├── validators/          # Custom Validators
│   │   ├── shared/              # Shared components
│   │   ├── environment/         # Environment settings
│   │   ├── app.routes.ts        # Route definitions
│   │   └── app.ts               # Main component
│   │
│   ├── styles.css               # Global styles
│   ├── index.html               # Main page
│   └── main.ts                  # Entry point
│
├── public/                      # Static files
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🚀 Technologies Used

### Core Framework
- **Angular 20.3.0** - Core framework
- **TypeScript 5.9.2** - Programming language
- **RxJS 7.8.0** - Reactive programming

### UI & Styling
- **Bootstrap 5.3.8** - Design framework
- **Font Awesome 7.1.0** - Icons
- **Custom CSS** - Custom designs

### Charts & Visualization
- **Chart.js 4.5.1** - For creating charts
- **ng2-charts 8.0.0** - Chart.js integration with Angular
- **ngx-chartjs 0.0.1** - Additional charting library

### Video & Communication
- **@stream-io/video-client 1.37.3** - For live streaming and video
- **Jitsi Meet Integration** - For virtual meetings

### Development Tools
- **Angular CLI 20.3.3** - Development tools
- **Jasmine & Karma** - For testing
- **Prettier** - Code formatting

## 📱 Main Components (31 Components)

### 🏠 Core Pages

#### 1. **Home Component**
- Application home page
- Featured courses display
- General statistics
- Quick links

#### 2. **Login Component**
- User login
- JWT authentication
- Remember me
- Forgot password

#### 3. **Register Component**
- New user registration
- Data validation
- Account type selection (student/instructor)

#### 4. **Register Instructor Component**
- Special instructor registration
- Upload qualifications
- Approval request

### 📚 Course Management

#### 5. **Courses Component**
- Display all courses
- Search and filter
- Category sorting
- Pagination

#### 6. **Add Course Component**
- Add new course
- Upload course image
- Set price and description

#### 7. **Edit Course Component**
- Edit course data
- Update content

#### 8. **Delete Course Component**
- Delete course
- Confirm deletion

### 📖 Unit and Lesson Management

#### 9. **Units Component**
- Display course units
- Order units
- Add/edit/delete

#### 10. **Add Unit Component**
- Add new unit to course

#### 11. **Update Unit Component**
- Edit unit data

#### 12. **Lessons Component**
- Display unit lessons
- Track progress
- Order lessons

#### 13. **Add Lesson Component**
- Add new lesson
- Upload lesson content (video/PDF/text)
- Set lesson duration

#### 14. **Lesson Details Component**
- Display lesson details
- View content
- Comments and discussions
- Download resources

#### 15. **Edit Lesson Component**
- Edit lesson content
- Update resources

#### 16. **Delete Lesson Component**
- Delete lesson
- Confirm deletion

### 📝 Quiz System

#### 17. **Create Quiz Component**
- Create new quiz
- Add multiple choice questions
- Set grades and time

#### 18. **Quiz List Component**
- Display quiz list
- Quiz status (completed/incomplete)
- Grades

#### 19. **Take Quiz Component**
- Take quiz
- Timer
- Auto-save answers
- Navigate between questions

#### 20. **Quiz Result Component**
- Display quiz result
- Correct and incorrect answers
- Final grade
- Review

### 👥 User Management

#### 21. **User Profile Component**
- Personal user profile
- Edit data
- Change profile picture
- Student statistics

#### 22. **My Courses Component**
- Student enrolled courses
- Progress in each course
- Certificates

#### 23. **Instructors List Component**
- Display instructor list
- Search for instructor
- Ratings

#### 24. **Instructor Profile Component**
- Instructor profile
- Courses taught
- Reviews and ratings
- Statistics

#### 25-27. **Instructor CRUD Components**
- **Add Instructor**: Add new instructor
- **Edit Instructor**: Edit instructor data
- **Delete Instructor**: Delete instructor

### 💬 Communication and Meetings

#### 28. **Chat Room Component**
- Live chat system
- Group and individual conversations
- File sharing
- Search in conversations
- Highlight important messages

#### 29. **Jitsi Component**
- Live video meetings
- Screen sharing
- Chat during meeting
- Record meetings

#### 30. **Meeting Setup Component**
- Meeting setup
- Test camera and microphone
- Audio and video settings
- Join meeting

### 🎛️ Administration

#### 31. **Admin Panel Component**
- Admin dashboard
- User management
- System statistics
- Approvals and requests
- Role management

### 🔧 Additional Components

- **Enrollment Component**: Course enrollment management
- **Rating Component**: Course and instructor ratings
- **Department Component**: Department management
- **Student Component**: Student management
- **Exam Component**: Exam system
- **Navbar Component**: Navigation bar
- **Footer Component**: Page footer
- **Error Page Component**: Error page (404)
- **Skeleton Demo Component**: Loading Skeletons

## 🌐 Multilingual Support

The application includes a comprehensive **Google Translate Integration** allowing users to access the platform in their preferred language.

- **Dynamic Translation**: Real-time translation of all page content.
- **Language Persistance**: Saves user language preference.
- **Supported Languages**: Supports a wide range of global languages.

## 🤖 AI & Smart Features

The project incorporates advanced AI capabilities to enhance learning:

### 🧠 AI Chat Assistant (Chat Room)
- **Smart Conversations**: Integrated with OpenAI's ChatGPT for intelligent responses.
- **Context Awareness**: Maintains conversation history for context-aware interactions.
- **Instant Help**: Students can ask questions and get immediate AI-generated explanations.

### 📄 PDF Chat Analysis
- **Smart Document Processing**: Upload PDF documents to the chat.
- **AI Summary**: Automatically generates summaries of uploaded PDFs.
- **Interactive Q&A**: Users can chat with the AI about the content of the PDF.

### 📝 AI-Enhanced Quizzes
- **Smart Assessment**: AI algorithms (integrated in Quiz page) to assist in assessment and learning validation.
- **Detailed AI Reports**: After each quiz, the AI generates a comprehensive performance report:
  - 📊 **Result Summary**: A detailed overview of exam performance.
  - ❌ **Mistake Analysis**: Identifies errors and explains why the answer was incorrect.
  - 💡 **Smart Solutions**: Provides correct answers with detailed explanations.
  - 📈 **Development Plan**: customized advice for the student to improve in weak areas.

## 💳 Payment & Enrollment System

A secure and robust payment infrastructure:
- **Enrollment Management**: Seamless course enrollment process.
- **Payment Processing**: Integration with payment gateways (Stripe/Payment API).
- **Payment History**: Students can view their payment status.
- **Admin Oversight**: Administrators can track and verify payments via the **Admin Payment Panel**.

## ⭐ Rating & Reviews

- **Instructor Ratings**: Students can rate and review instructors.
- **Course Feedback**: Detailed review system for courses.
- **Quality Assurance**: Helps maintain high-quality content through user feedback.

## 📹 Advanced Meeting System

The platform features a dual-integration meeting system:

### Jitsi Meet Integration
- **Secure Video Conferences**: High-quality video meetings.
- **Screen Sharing**: Built-in screen sharing capabilities.
- **Moderator Controls**: Mute/Unmute and participant management.
- **Recording**: Meeting recording options.

### Stream.io Video Integration
- **Live Streaming**: Scalable live streaming for large classes.
- **Real-time Interaction**: Low-latency video and audio.

## 🛣️ Routes (Routing)

The application contains a comprehensive routing system:

```typescript
// Home
/Home

// Authentication
/login
/register
/register-instructor

// Courses
/Courses
/courses/add
/courses/edit/:id
/Courses/delete/:id

// Units
/Courses/:id/units
/Courses/:id/units/add
/Courses/:id/units/edit/:unitId

// Lessons
/Courses/:courseId/units/:unitId/lessons
/Courses/:courseId/units/:unitId/lessons/add
/Courses/:courseId/units/:unitId/lessons/:lessonId
/Courses/:courseId/units/:unitId/lessons/:lessonId/edit
/Courses/:courseId/units/:unitId/lessons/:lessonId/delete

// Quizzes
/lesson/:lessonId/quizzes
/lesson/:lessonId/create-quiz
/quiz/take/:quizId
/quiz/result/:quizId

// Users
/userProfile
/student/:id/courses

// Instructors
/instructors
/instructor/:id
/instructors/add
/instructors/edit/:id
/instructors/:id/confirm-delete

// Meetings
/meeting
/meeting-setup

// Chat
/chatRome

// Administration
/admin

// Exams
/exam
```

## 🔐 Security and Protection

### 🛡️ Role-Based Access Control (RBAC)
The application implements strict security policies across all levels:

1.  **User** (Base Level): Basic authenticated access.
2.  **Student**: Access to enrolled courses, quizzes, and learning materials.
3.  **Instructor**: content creation, course management, and student tracking.
4.  **Admin**: Full system control, user management, and sensitive operations.

### ✅ Data Integrity & Validation
All user inputs are rigorously validated across the application:
- **Reactive Forms**: Comprehensive use of Angular Reactive Forms for robust state management.
- **Input Validation**: Real-time validation for all fields (Required, Email, Patterns, Length, Custom Validators).
- **Sanitization**: All inputs are sanitized to prevent XSS attacks.

### Route Guards
- **Enrollment Guard**: Verify student enrollment in course
- **Auth Guard**: Verify login
- **Role Guard**: Verify specific role permissions (User/Student/Instructor/Admin)

### HTTP Interceptors
- **JWT Interceptor**: Add token to requests
- **Error Interceptor**: Error handling
- **Loading Interceptor**: Display loading indicator

## 🎨 Services

The application contains multiple services for backend communication:

- **AuthService**: Authentication and authorization
- **CourseService**: Course management
- **LessonService**: Lesson management
- **QuizService**: Quiz management
- **UserService**: User management
- **InstructorService**: Instructor management
- **EnrollmentService**: Enrollment management
- **ChatService**: Chat service
- **MeetingService**: Meeting management
- **ResourceService**: Resource management
- **AttendanceService**: Attendance management
- **RatingService**: Rating management
- **StreamService**: Live streaming service

## ⚙️ Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (optional but recommended)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd Front
```

2. **Install Dependencies**
```bash
npm install
```

3. **Update Environment Settings**

Open `src/app/environment/environment.ts` and update the API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7xxx/api'
};
```

4. **Run the Application**
```bash
npm start
# or
ng serve
```

5. **Open Browser**

Open browser at: `http://localhost:4200`

## 📜 Available Commands

```bash
# Run application in development mode
npm start
# or
ng serve

# Build application for production
npm run build
# or
ng build

# Build with watch
npm run watch
# or
ng build --watch --configuration development

# Run tests
npm test
# or
ng test

# Lint code
ng lint

# Update Angular
ng update
```

## 🎯 Main Features

### ✨ For Students
- ✅ Browse available courses
- ✅ Enroll in courses
- ✅ Watch lessons and content
- ✅ Take quizzes
- ✅ Track progress
- ✅ Get certificates
- ✅ Chat with instructors and students
- ✅ Attend virtual meetings
- ✅ Rate courses

### 👨‍🏫 For Instructors
- ✅ Create and manage courses
- ✅ Add units and lessons
- ✅ Upload content (video, PDF, files)
- ✅ Create quizzes
- ✅ Track student progress
- ✅ Hold virtual meetings
- ✅ Communicate with students
- ✅ View statistics

### 🎛️ For Administrators
- ✅ Manage users (students and instructors)
- ✅ Approve instructor requests
- ✅ Manage courses and content
- ✅ View system statistics
- ✅ Manage roles and permissions
- ✅ Monitor activity

## 🎨 Design and UI/UX

### Main Colors
- **Primary**: Teal/Turquoise (#20c997)
- **Secondary**: Dark Gray (#343a40)
- **Success**: Green (#28a745)
- **Danger**: Red (#dc3545)
- **Warning**: Yellow (#ffc107)

### Design Features
- ✨ Responsive design
- ✨ Dark Mode Support
- ✨ Smooth Animations
- ✨ Loading Skeletons
- ✨ Toast Notifications
- ✨ Modal Dialogs
- ✨ Pagination
- ✨ Search & Filter

## 📊 Charts and Statistics

The application uses **Chart.js** to display:
- 📈 Student progress
- 📊 Course statistics
- 📉 Completion rates
- 🎯 Quiz results
- 👥 Enrolled student count

## 🔌 Backend Integration

The application communicates with Backend API via:
- **HTTP Requests** (GET, POST, PUT, DELETE)
- **JWT Authentication**
- **File Upload/Download**
- **Real-time Updates** (WebSockets for chat)

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
ng e2e
```

## 🚀 Deployment

### Build for Production
```bash
ng build --configuration production
```

Files will be in the `dist/` folder

### Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📱 Browser Compatibility

The application is compatible with:
- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)

## 🔧 Customization

### Change Colors
Edit `src/styles.css`:
```css
:root {
  --primary-color: #20c997;
  --secondary-color: #343a40;
  /* ... */
}
```

### Change Logo
Replace files in `public/`:
- `logo.png`
- `favicon.ico`

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)
- [RxJS Documentation](https://rxjs.dev/)

## 🐛 Common Issues and Solutions

### Issue: Port 4200 in use
```bash
ng serve --port 4300
```

### Issue: CORS Error
Check CORS settings in Backend

### Issue: Module not found
```bash
npm install
```

## 🤝 Contributing

To contribute to the project:
1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

The project uses **Prettier** for formatting:
```bash
npm run format
```

Settings in `package.json`:
```json
{
  "prettier": {
    "printWidth": 100,
    "singleQuote": true
  }
}
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

For questions and inquiries:
- Email: support@smartlearning.com
- GitHub Issues: [Project Issues](https://github.com/your-repo/issues)

## � Team Members

This project was developed by:
- **Abdalla Khalil**
- **Mennatullah Atef**
- **Hisham Radi**
- **Ramiz Magdy**

## �🙏 Acknowledgments

- Angular Team
- Bootstrap Team
- Chart.js Team
- Stream.io Team
- Jitsi Team
- Font Awesome Team

---

**Note**: This project is under active development. Some features may be in progress.

**Tip**: For the best experience, use Chrome or Firefox with the latest version.
