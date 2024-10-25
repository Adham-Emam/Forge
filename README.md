# Forge

Forge is a skill exchange platform that allows users to trade skills or perform freelance work for project owners, earning a unique in-platform currency, **Embers**. Users can redeem embers for real-world money, making Forge an ideal space for skill-building, collaboration, and financial reward.

## Key Features

- **Skill Exchange Using Embers**: Users can exchange skills, providing services in return for embers, which can later be redeemed for cash.
- **Freelance Job Board**: A dedicated space for users to find freelance jobs or offer their own skills.
- **Advanced Filtering Algorithms**: Efficient filtering for skills and projects to enhance search and match results.
- **Real-World Cash Redemption**: Embers earned through services and skills can be converted into real money.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js and npm**: Required for the Next.js frontend.
- **Python**: Required for Django, the backend framework.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/forge.git
   cd forge
   ```

2. **Backend Setup (Django)**
   - Navigate to the backend directory.
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run database migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the Django server:
     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup (Next.js)**
   - Navigate to the frontend directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Next.js development server:
     ```bash
     npm run dev
     ```

### Deployment

Forge is deployed using [Vercel](https://vercel.com/), which supports Next.js for frontend deployment, while Django can be deployed to a separate service as needed.

## Usage

1. **Sign Up / Log In**: Create an account or log in to access all features.
2. **Explore Freelance and Skill Exchange Options**: Use the high-end filters to find projects or talent.
3. **Earn Embers**: Complete tasks, projects, or skill exchanges to earn embers.
4. **Redeem Embers**: Convert earned embers to real-world cash.

## Contributing

Contributions are welcome! If you're interested in enhancing Forge or fixing issues, please open an issue or submit a pull request.
