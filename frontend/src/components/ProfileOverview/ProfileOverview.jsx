export default function({ profile }) {
    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">About</h5>
            <p className="small fst-italic">
                {profile.about? profile.about :
                    <span className="small fst-italic text-muted">No information provided</span>
                }
                </p>
            <h5 className="card-title">Profile Details</h5>
            <div className="row">
                <div className="col-lg-3 col-md-4 label ">Company name</div>
                <div className="col-lg-9 col-md-8">
                    {profile.company_name? profile.company_name :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
            {/* <div className="row">
                <div className="col-lg-3 col-md-4 label">Company</div>
                <div className="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
            </div> */}
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Activity</div>
                <div className="col-lg-9 col-md-8">
                    {profile.activity? profile.activity :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Country</div>
                <div className="col-lg-9 col-md-8">
                    {profile.country? profile.country :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Address</div>
                <div className="col-lg-9 col-md-8">
                    {profile.address? profile.address :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8">
                    {profile.phone? profile.phone :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">
                    {profile.email? profile.email :
                        <span className="small fst-italic text-muted">No information provided</span>
                    }
                </div>
            </div>
        </div>
    )
}