# 📸 InstaInsights

A modern Instagram analytics tool built with React that helps you discover:

* ❌ People who don't follow you back
* ❤️ Fans (people who follow you but you don't follow back)
* 🤝 Mutual followers
* 📊 Account analytics and insights
* 📥 Export unfollowers to CSV
* 🔍 Search usernames instantly
* 🌙 Dark / Light mode support

---

## 🚀 Features

### 📂 Upload Instagram Data

Simply export your Instagram data and upload:

* `followers_1.json || followers.json`
* `following.json`

The app processes everything locally inside your browser.

### 🔍 Username Search

Quickly search through your unfollowers list.

### 📊 Analytics Dashboard

Visualize your Instagram relationships using interactive charts.

### 📥 CSV Export

Download unfollowers as a CSV file for future reference.

### 🌙 Dark Mode

Beautiful dark and light themes with persistent preferences.

### 🔒 Privacy First

No data is uploaded to any server.
Everything runs completely inside your browser.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* React Dropzone
* React Hot Toast
* React Icons
* Recharts

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/insta-insights.git
```

Move into the project:

```bash
cd insta-insights
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📁 Project Structure

```text
src
│
├── components
│   ├── FileUpload.jsx
│   ├── Results.jsx
│   └── Analytics.jsx
│
├── App.jsx
├── main.jsx
├── index.css
```

---

## 📊 How It Works

The application compares:

```text
Following List
      -
Followers List
```

to determine:

```text
People You Follow
Who Don't Follow You Back
```

It also calculates:

* Fans
* Mutual Followers
* Total Connections

---

## 🔐 Privacy

Your Instagram export files never leave your device.

All processing is performed locally using JavaScript in the browser.

No database.
No backend.
No tracking.

---

## 🎯 Future Improvements

* Recently Unfollowed Detection
* Profile Picture Support
* Advanced Analytics
* Growth Tracking
* Multiple Followers File Support
* Historical Comparison Reports

---

## 👨‍💻 Author

Suraj

Frontend Developer | MERN Stack Developer

---

⭐ If you found this project useful, consider giving it a star on GitHub.
