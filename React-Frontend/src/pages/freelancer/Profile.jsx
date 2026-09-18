import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import "./Profile.css";


function Profile() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");


    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [editing, setEditing] =
        useState(false);


    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [professionalTitle, setProfessionalTitle] =
        useState("");

    const [bio, setBio] =
        useState("");

    const [skills, setSkills] =
        useState("");


    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    


        


            
        async function loadProfile() {

    if (!token) {

        navigate("/login");

        return;

    }


    try {

        setLoading(true);

        setError("");


        const response =
            await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        console.log(
            "PROFILE RESPONSE:",
            data
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            navigate("/login");

            return;

        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load profile."
            );

        }


        setProfile(data.user);


        setName(
            data.user.name || ""
        );

        setPhone(
            data.user.phone_number || ""
        );

        setProfessionalTitle(
            data.user.professional_title || ""
        );

        setBio(
            data.user.bio || ""
        );

        setSkills(
            data.user.skills || ""
        );

    }

    catch (error) {

        console.log(
            "Profile error:",
            error
        );


        setError(
            error.message ||
            "Unable to load profile."
        );

    }

    finally {

        setLoading(false);

    }

}

    // ==========================================
    // SAVE PROFILE
    // ==========================================

    async function handleSave(event) {

        event.preventDefault();


        setMessage("");
        setError("");


        if (!name.trim()) {

            setError(
                "Name is required."
            );

            return;

        }


        try {

            const response =
                await fetch(
                   "http://localhost:5000/api/profile",
                   {
                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            name:
                                name.trim(),

                            phone_number:
                                phone,

                            professional_title:
                                professionalTitle.trim(),

                            bio:
                                bio.trim(),

                            skills:
                                skills.trim()

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to update profile."
                );

            }


            setProfile(data.user);


            setName(
                data.user.name || ""
            );

            setPhone(
                data.user.phone_number || ""
            );

            setProfessionalTitle(
                data.user.professional_title || ""
            );

            setBio(
                data.user.bio || ""
            );

            setSkills(
                data.user.skills || ""
            );


            setEditing(false);


            setMessage(
                "Profile updated successfully."
            );

        }

        catch (error) {

            console.log(
                "Update profile error:",
                error
            );

            setError(
                error.message ||
                "Unable to update profile."
            );

        }

    }


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    function handleCancel() {

        setEditing(false);

        setName(
            profile.name || ""
        );

        setPhone(
            profile.phone_number || ""
        );

        setProfessionalTitle(
            profile.professional_title || ""
        );

        setBio(
            profile.bio || ""
        );

        setSkills(
            profile.skills || ""
        );

        setError("");

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <>

                <Navbar />

                <main className="profile-page">

                    <div className="profile-message">

                        Loading profile...

                    </div>

                </main>

            </>

        );

    }


    // ==========================================
    // PROFILE PAGE
    // ==========================================

    return (

        <>

            <Navbar />


            <main className="profile-page">


                {/* HEADER */}

                <section className="profile-header">

                    <p className="profile-label">
                        FREELANCER WORKSPACE
                    </p>


                    <h1>
                        My Profile
                    </h1>


                    <p>
                        Manage your personal
                        information and professional
                        profile.
                    </p>

                </section>


                {/* ERROR */}

                {error && (

                    <div className="profile-message error">

                        {error}

                    </div>

                )}


                {/* SUCCESS */}

                {message && (

                    <div className="profile-message success">

                        {message}

                    </div>

                )}


                {profile && (

                    <section className="profile-card">


                        {/* PROFILE SUMMARY */}

                        <div className="profile-summary">

                            <div className="profile-avatar">

                                {profile.name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                            </div>


                            <div>

                                <h2>
                                    {profile.name}
                                </h2>


                                <p>
                                    {profile.role}
                                </p>

                            </div>

                        </div>


                        <div className="profile-divider"></div>


                        {!editing ? (

                            <>

                                {/* PERSONAL INFORMATION */}

                                <h3 className="profile-section-title">
                                    Personal Information
                                </h3>


                                <div className="profile-info">


                                    <div className="profile-info-item">

                                        <span>
                                            Full Name
                                        </span>

                                        <strong>
                                            {profile.name}
                                        </strong>

                                    </div>


                                    <div className="profile-info-item">

                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {profile.email}
                                        </strong>

                                    </div>


                                    <div className="profile-info-item">

                                        <span>
                                            Phone Number
                                        </span>

                                        <strong>
                                            {profile.phone_number ||
                                                "Not added"
                                            }
                                        </strong>

                                    </div>


                                    <div className="profile-info-item">

                                        <span>
                                            Account Type
                                        </span>

                                        <strong>
                                            {profile.role}
                                        </strong>

                                    </div>

                                </div>


                                {/* PROFESSIONAL INFORMATION */}

                                <h3 className="profile-section-title professional-title">
                                    Professional Information
                                </h3>


                                <div className="professional-info">


                                    <div className="professional-info-item">

                                        <span>
                                            Professional Title
                                        </span>

                                        <strong>
                                            {profile.professional_title ||
                                                "Not added"
                                            }
                                        </strong>

                                    </div>


                                    <div className="professional-info-item">

                                        <span>
                                            Skills
                                        </span>

                                        <strong>
                                            {profile.skills ||
                                                "Not added"
                                            }
                                        </strong>

                                    </div>


                                    <div className="professional-bio">

                                        <span>
                                            About Me
                                        </span>

                                        <p>
                                            {profile.bio ||
                                                "No bio added yet."
                                            }
                                        </p>

                                    </div>

                                </div>


                                <button
                                    className="edit-profile-button"
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                >
                                    Edit Profile
                                </button>

                            </>

                        ) : (

                            /* ==================================
                               EDIT FORM
                            ================================== */

                            <form
                                className="profile-form"
                                onSubmit={handleSave}
                            >


                                {/* NAME */}

                                <div className="form-group">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) =>
                                            setName(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                    />

                                    <small>
                                        Email cannot be changed.
                                    </small>

                                </div>


                                {/* PHONE */}

                                <div className="form-group">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        value={phone}
                                        maxLength="10"
                                        onChange={(event) =>
                                            setPhone(
                                                event.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }
                                    />

                                </div>


                                {/* PROFESSIONAL TITLE */}

                                <div className="form-group">

                                    <label>
                                        Professional Title
                                    </label>

                                    <input
                                        type="text"
                                        value={professionalTitle}
                                        placeholder="Example: Full Stack Developer"
                                        maxLength="150"
                                        onChange={(event) =>
                                            setProfessionalTitle(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* BIO */}

                                <div className="form-group">

                                    <label>
                                        About Me
                                    </label>

                                    <textarea
                                        value={bio}
                                        placeholder="Tell clients about yourself, your experience and what you can offer."
                                        rows="5"
                                        onChange={(event) =>
                                            setBio(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* SKILLS */}

                                <div className="form-group">

                                    <label>
                                        Skills
                                    </label>

                                    <input
                                        type="text"
                                        value={skills}
                                        placeholder="Example: Java, React.js, Node.js, MySQL"
                                        onChange={(event) =>
                                            setSkills(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <small>
                                        Separate multiple skills
                                        with commas.
                                    </small>

                                </div>


                                {/* BUTTONS */}

                                <div className="profile-actions">

                                    <button
                                        type="submit"
                                        className="save-profile-button"
                                    >
                                        Save Changes
                                    </button>


                                    <button
                                        type="button"
                                        className="cancel-profile-button"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        )}

                    </section>

                )}

            </main>

        </>

    );

}


export default Profile;