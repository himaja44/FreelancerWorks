import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";


function Home() {

    return (
    <div className="home-page">

            <Navbar />

        
            {/* =====================================
                HERO
            ===================================== */}

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        ✦ THE FUTURE OF FREELANCING
                    </div>


                    <h1>
                        Work with great people.
                        <span>Build great things.</span>
                    </h1>


                    <p className="hero-description">
                        Freelancer Works connects talented
                        professionals with businesses looking
                        for the right skills. Find your next
                        opportunity or hire the perfect
                        freelancer for your project.
                    </p>


                    <div className="hero-buttons">

                        <Link
                            to="/jobs"
                            className="primary-btn"
                        >
                            Find Jobs →
                        </Link>


                        <Link
                            to="/register"
                            className="secondary-btn"
                        >
                            Hire Talent
                        </Link>

                    </div>

                </div>


                <div className="hero-info">

                    <div className="info-card">

                        <div className="info-icon">
                            💼
                        </div>

                        <div>

                            <strong>
                                Find Opportunities
                            </strong>

                            <p>
                                Discover jobs that match your skills.
                            </p>

                        </div>

                    </div>


                    <div className="info-card">

                        <div className="info-icon">
                            👥
                        </div>

                        <div>

                            <strong>
                                Connect With Talent
                            </strong>

                            <p>
                                Find skilled professionals for your projects.
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            


            {/* =====================================
                STATS
            ===================================== */}

            <section className="stats">

                <div className="stat">

                    <h2>10K+</h2>

                    <p>
                        Skilled Freelancers
                    </p>

                </div>


                <div className="stat">

                    <h2>5K+</h2>

                    <p>
                        Projects Posted
                    </p>

                </div>


                <div className="stat">

                    <h2>3K+</h2>

                    <p>
                        Projects Completed
                    </p>

                </div>


                <div className="stat">

                    <h2>95%</h2>

                    <p>
                        Client Satisfaction
                    </p>

                </div>

            </section>


            {/* =====================================
                CATEGORIES
            ===================================== */}

            <section className="categories">

                <div className="section-heading">

                    <div>

                        <p className="section-label">
                            EXPLORE CATEGORIES
                        </p>

                        <h2>
                            Find work that
                            <span> matches your skills.</span>
                        </h2>

                    </div>


                    <Link to="/jobs">
                        View All Jobs →
                    </Link>

                </div>


                <div className="category-container">

                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            💻
                        </div>

                        <h3>
                            Web Development
                        </h3>

                        <p>
                            1,250+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            🎨
                        </div>

                        <h3>
                            UI / UX Design
                        </h3>

                        <p>
                            640+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            📱
                        </div>

                        <h3>
                            Mobile Development
                        </h3>

                        <p>
                            820+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            🤖
                        </div>

                        <h3>
                            AI & Machine Learning
                        </h3>

                        <p>
                            520+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            ✍️
                        </div>

                        <h3>
                            Writing & Content
                        </h3>

                        <p>
                            430+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/jobs"
                        className="category-card"
                    >

                        <div className="category-icon">
                            📈
                        </div>

                        <h3>
                            Digital Marketing
                        </h3>

                        <p>
                            380+ jobs
                        </p>

                        <span className="category-arrow">
                            →
                        </span>

                    </Link>

                </div>

            </section>


            {/* =====================================
                FEATURED JOBS
            ===================================== */}

            <section className="featured-jobs">

                <div className="section-heading">

                    <div>

                        <p className="section-label">
                            LATEST OPPORTUNITIES
                        </p>

                        <h2>
                            Featured jobs
                        </h2>

                    </div>


                    <Link to="/jobs">
                        Browse All Jobs →
                    </Link>

                </div>


                <div className="featured-job-grid">


                    <article className="featured-job-card">

                        <div className="job-company-row">

                            <div className="company-icon">
                                R
                            </div>

                            <div>

                                <p>
                                    RemoteTech
                                </p>

                                <small>
                                    Posted 2 hours ago
                                </small>

                            </div>

                            

                        </div>


                        <h3>
                            React.js Developer
                        </h3>


                        <p className="job-description">
                            Looking for a React developer to
                            build modern and scalable web
                            applications.
                        </p>


                        <div className="job-tags">

                            <span>React</span>
                            <span>JavaScript</span>
                            <span>REST API</span>

                        </div>


                        <div className="featured-job-footer">

                            <div>

                                <strong>
                                    ₹35K - ₹55K
                                </strong>

                                <p>
                                    Remote • Entry Level
                                </p>

                            </div>


                            <Link to="/jobs">
                                View →
                            </Link>

                        </div>

                    </article>



                    <article className="featured-job-card">

                        <div className="job-company-row">

                            <div className="company-icon">
                                T
                            </div>

                            <div>

                                <p>
                                    TechNova
                                </p>

                                <small>
                                    Posted 5 hours ago
                                </small>

                            </div>

                            <button className="save-job">
                                ♡
                            </button>

                        </div>


                        <h3>
                            Java Spring Boot Developer
                        </h3>


                        <p className="job-description">
                            Build REST APIs and backend services
                            for our enterprise application.
                        </p>


                        <div className="job-tags">

                            <span>Java</span>
                            <span>Spring Boot</span>
                            <span>MySQL</span>

                        </div>


                        <div className="featured-job-footer">

                            <div>

                                <strong>
                                    ₹45K - ₹70K
                                </strong>

                                <p>
                                    Remote • Intermediate
                                </p>

                            </div>


                            <Link to="/jobs">
                                View →
                            </Link>

                        </div>

                    </article>



                    <article className="featured-job-card">

                        <div className="job-company-row">

                            <div className="company-icon">
                                A
                            </div>

                            <div>

                                <p>
                                    AI Labs
                                </p>

                                <small>
                                    Posted yesterday
                                </small>

                            </div>

                            <button className="save-job">
                                ♡
                            </button>

                        </div>


                        <h3>
                            Machine Learning Engineer
                        </h3>


                        <p className="job-description">
                            Help us build recommendation models
                            and intelligent data-driven products.
                        </p>


                        <div className="job-tags">

                            <span>Python</span>
                            <span>Machine Learning</span>
                            <span>TensorFlow</span>

                        </div>


                        <div className="featured-job-footer">

                            <div>

                                <strong>
                                    ₹60K - ₹90K
                                </strong>

                                <p>
                                    Remote • Expert
                                </p>

                            </div>


                            <Link to="/jobs">
                                View →
                            </Link>

                        </div>

                    </article>



                    <article className="featured-job-card">

                        <div className="job-company-row">

                            <div className="company-icon">
                                D
                            </div>

                            <div>

                                <p>
                                    DesignHub
                                </p>

                                <small>
                                    Posted yesterday
                                </small>

                            </div>

                            <button className="save-job">
                                ♡
                            </button>

                        </div>


                        <h3>
                            UI / UX Designer
                        </h3>


                        <p className="job-description">
                            Design beautiful and intuitive
                            interfaces for our next-generation
                            SaaS platform.
                        </p>


                        <div className="job-tags">

                            <span>Figma</span>
                            <span>UI Design</span>
                            <span>Prototyping</span>

                        </div>


                        <div className="featured-job-footer">

                            <div>

                                <strong>
                                    ₹25K - ₹45K
                                </strong>

                                <p>
                                    Remote • Intermediate
                                </p>

                            </div>


                            <Link to="/jobs">
                                View →
                            </Link>

                        </div>

                    </article>

                </div>

            </section>


            {/* =====================================
                HOW IT WORKS
            ===================================== */}

            <section className="how-it-works" id="how-it-works">

                <div className="section-heading centered">

                    <p className="section-label">
                        SIMPLE PROCESS
                    </p>

                    <h2>
                        How Freelancer Works
                    </h2>

                    <p>
                        Whether you're looking for work or
                        hiring talent, getting started is simple.
                    </p>

                </div>


                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Create your profile
                        </h3>

                        <p>
                            Showcase your skills, experience,
                            portfolio and expertise.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Find the right opportunity
                        </h3>

                        <p>
                            Browse jobs that match your skills
                            and career goals.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Work & grow
                        </h3>

                        <p>
                            Connect with clients, complete
                            projects and build your reputation.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                ABOUT
            ===================================== */}

            <section
                className="about-section"
                id="about"
            >

                <div className="about-content">

                    <p className="section-label">
                        ABOUT FREELANCER WORKS
                    </p>

                    <h2>
                        A better way to work,
                        hire and grow.
                    </h2>

                    <p>
                        Freelancer Works is a platform that
                        connects talented freelancers with
                        businesses looking for skilled
                        professionals.
                    </p>

                    <p>
                        Whether you are looking for your next
                        opportunity or building a team for your
                        project, Freelancer Works makes it simple
                        to connect and collaborate.
                    </p>

                </div>

            </section>


            {/* =====================================
                PRICING
            ===================================== */}

            <section
                className="pricing-section"
                id="pricing"
            >

                <div className="pricing-heading">

                    <p className="section-label">
                        SIMPLE PRICING
                    </p>

                    <h2>
                        Start working with Freelancer Works.
                    </h2>

                    <p>
                        Simple options for freelancers and clients.
                    </p>

                </div>


                <div className="pricing-grid">


                    <div className="pricing-card">

                        <h3>
                            For Freelancers
                        </h3>

                        <p className="pricing-description">
                            Everything you need to find opportunities
                            and grow your freelance career.
                        </p>

                        <div className="price">
                            Free
                        </div>

                        <ul>

                            <li>✓ Create your profile</li>

                            <li>✓ Browse freelance jobs</li>

                            <li>✓ Apply for opportunities</li>

                            <li>✓ Manage applications</li>

                        </ul>


                        <Link
                            to="/register"
                            className="pricing-button"
                        >
                            Join as Freelancer
                        </Link>

                    </div>



                    <div className="pricing-card featured-pricing">

                        <div className="pricing-badge">
                            FOR CLIENTS
                        </div>

                        <h3>
                            Hire Talent
                        </h3>

                        <p className="pricing-description">
                            Find skilled freelancers and build your
                            team for your next project.
                        </p>

                        <div className="price">
                            Free
                        </div>

                        <ul>

                            <li>✓ Post freelance jobs</li>

                            <li>✓ Find skilled freelancers</li>

                            <li>✓ Review applications</li>

                            <li>✓ Manage projects</li>

                        </ul>


                        <Link
                            to="/register"
                            className="pricing-button"
                        >
                            Start Hiring
                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================
                TESTIMONIALS
            ===================================== */}

            <section className="testimonials">

                <div className="section-heading centered">

                    <p className="section-label">
                        COMMUNITY STORIES
                    </p>

                    <h2>
                        Trusted by freelancers
                        and businesses
                    </h2>

                </div>


                <div className="testimonial-grid">


                    <article className="testimonial-card">

                        <div className="testimonial-rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p>
                            "Freelancer Works helped me find my
                            first remote development project. The
                            platform made it easy to showcase my
                            skills and connect with the right client."
                        </p>


                        <div className="testimonial-user">

                            <div className="user-avatar">
                                H
                            </div>

                            <div>

                                <strong>
                                    Himaja
                                </strong>

                                <span>
                                    Full Stack Developer
                                </span>

                            </div>

                        </div>

                    </article>



                    <article className="testimonial-card">

                        <div className="testimonial-rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p>
                            "We needed a talented React developer
                            for our startup. We found the right person
                            quickly and completed the project ahead
                            of schedule."
                        </p>


                        <div className="testimonial-user">

                            <div className="user-avatar">
                                R
                            </div>

                            <div>

                                <strong>
                                    Rahul
                                </strong>

                                <span>
                                    Startup Founder
                                </span>

                            </div>

                        </div>

                    </article>



                    <article className="testimonial-card">

                        <div className="testimonial-rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p>
                            "The ability to discover projects that
                            match my skills has helped me grow my
                            freelance career significantly."
                        </p>


                        <div className="testimonial-user">

                            <div className="user-avatar">
                                P
                            </div>

                            <div>

                                <strong>
                                    Priya
                                </strong>

                                <span>
                                    UI/UX Designer
                                </span>

                            </div>

                        </div>

                    </article>

                </div>

            </section>


            {/* =====================================
                CTA
            ===================================== */}

            <section className="cta">

                <div>

                    <p className="section-label">
                        START TODAY
                    </p>

                    <h2>
                        Your next opportunity
                        is waiting.
                    </h2>

                    <p>
                        Join thousands of freelancers and
                        businesses building something great together.
                    </p>

                </div>


                <div className="cta-buttons">

                    <Link to="/register">
                        Get Started →
                    </Link>


                    <Link
                        to="/jobs"
                        className="cta-outline"
                    >
                        Explore Jobs
                    </Link>

                </div>

            </section>


            {/* =====================================
                FOOTER
            ===================================== */}

            <footer>

                <div className="footer-content">


                    <div className="footer-brand">

                        <div className="footer-logo">
                            Freelancer<span>Works</span>
                        </div>

                        <p>
                            Connecting talented professionals
                            with meaningful opportunities.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>
                            For Freelancers
                        </h4>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                        <Link to="/register">
                            Create Profile
                        </Link>

                        <a href="#how-it-works">
                            How It Works
                        </a>

                    </div>


                    <div className="footer-column">

                        <h4>
                            For Clients
                        </h4>

                        <Link to="/register">
                            Find Talent
                        </Link>

                        <Link to="/register">
                            Post a Job
                        </Link>

                        <a href="#how-it-works">
                            Hiring Guide
                        </a>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Freelancer Works
                        </h4>

                        <a href="#about">
                            About Us
                        </a>

                        <a href="#pricing">
                            Pricing
                        </a>

                        <a href="#">
                            Privacy
                        </a>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 Freelancer Works.
                        All rights reserved.
                    </p>

                    <p>
                        Built as a Fullstack Web Development Project
                    </p>

                </div>

            </footer>

        </div>

    );

}


export default Home;