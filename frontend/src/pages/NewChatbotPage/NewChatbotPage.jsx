import './NewChatbotPage.css';

const NewChatbotPage = () => {

    const handleSubmit = (e) => {};

    // async function checkURLExists(url) {
    //     try {
    //         const response = await fetch(url, { method: 'HEAD' });  // Using 'HEAD' to only get headers without body
    //         return response.ok; // Returns true if status is 200-299
    //     } catch (error) {
    //         console.error('Error fetching URL:', error);
    //         return false; // Returns false if there's an error (e.g., network issues)
    //     }
    // }
    
    // // Example usage:
    // checkURLExists('https://example.com').then(exists => {
    //     if (exists) {
    //         console.log('URL exists!');
    //     } else {
    //         console.log('URL does not exist!');
    //     }
    // });
    
    
    return(
        <main>
            <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">

                
                <div className="row justify-content-center">

                {/* <div className="alerts col-lg-8 col-md-6">
                    {success && 
                    <div 
                        ref={successRef} 
                        className="alert alert-success" 
                        role="alert"
                    >
                    {success}
                    </div>
                    }

                    {error && 
                    <div
                        ref={errorRef} 
                        className="alert alert-danger" 
                        role="alert"
                    >
                    {error}
                    </div>
                    }
                </div> */}

                    <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="d-flex justify-content-center py-4">
                        <a href="#" className="logo d-flex align-items-center w-auto">
                        {/* <img src="assets/img/logo.png" alt="" /> */}
                        <span className="d-none d-lg-block">AionChat</span>
                        </a>
                    </div>
                    
                    <div className="card mb-3">
                        <div className="card-body">

                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Initialize a new Chatbot</h5>
                            <p className="text-center small">Customize your chatbot by enter the following details.</p>
                        </div>

                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="col-12">
                            <label htmlFor="chatbot_name" className="form-label">Chatbot Name *</label>
                            <input type="text" name="chatbot_name" className="form-control" id="chatbot_name" required 
                                // value={chatbotName}
                                // onChange={(e) => setChatbotName(e.target.value)}
                            />
                            <div className="invalid-feedback">Please, enter your chatbot name!</div>
                            </div>
{/* 
                            <div className="col-12">
                            <label htmlFor="email" className="form-label">Email *</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="email" name="email" className="form-control" id="email" required
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="invalid-feedback">Please  enter a valid Email address!</div>
                            </div>
                            </div> */}

                            <div className="col-12">
                            <label htmlFor="website_url" className="form-label">Website URL *</label>
                            <input type="text" name="website_url" className="form-control" id="website_url" required
                                // value={websiteUrl}
                                // onChange={(e) => setWebsiteUrl(e.target.value)}
                            />
                            
                            <div className="invalid-feedback">Please, enter your website URL!</div>
                            </div>

                            <div className="col-12">
                            <label htmlFor="website_url" className="form-label">Chatbot Avatar</label>
                                <input class="form-control" type="file" id="formFile" />
                            </div>

                            <div className="col-12">
                                <button className="submit-button btn btn-primary w-100" type="submit">Initialize Chatbot</button>
                            </div>

                        </form>

                        </div>
                    </div>

                    <div className="credits">
                        © 2024 Copyright Monarkit. All Rights Reserved
                    </div>

                    </div>
                </div>
                </div>
            </section>
            </div>
        </main>
    )
};

export default NewChatbotPage;