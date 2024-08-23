import { Link } from "react-router-dom";
import ChatbotTableLine from "../../components/ChatbotTableLine/ChatbotTableLine";
import "./ChatbotListPage.css";
import { useEffect, useRef, useState } from "react";


const ListChatbotPage = () => {
    const [chatbotData, setChatbotData] = useState(null);
    const [chatbots, setChatbots] = useState(null);
    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const successRef = useRef(null);
    const errorRef = useRef(null);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        fetch('http://127.0.0.1:8000/api/chatbots/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        .then(response => {
            console.log('Response:', response);
            return response.json();
          })
          .then(data => {
            console.log('Data:', data);
            setChatbotData(data);
            setChatbots(
                data.map((chatbot) => {
                    return (
                        <ChatbotTableLine
                            key={chatbot.id}
                            id={chatbot.id}
                            name={chatbot.name}
                            description={chatbot.description}
                            avatar={chatbot.avatar}
                            status={chatbot.status}
                            createdAt={chatbot.created_at}
                            websiteUrl={chatbot.website_url}
                            // updated_at={chatbot.updated_at}
                        />
                    );
                })
            );
            // console.log('Chatbots:', chatbots);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false);
          });
      }, []);

    if (!chatbotData) return (
        <main className='loading'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
        </main>
    );

    return (
        <main>

            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h5 className="card-title">Your Chatbots</h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                            <div>
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <a aria-current="page" href="#" className="router-link-active router-link-exact-active nav-link active" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="List" aria-label="List">
                                            <i className="bi bi-list-ul"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Grid" aria-label="Grid"><i className="bi bi-grid"></i></a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <Link to={"/new-chatbot"} className="btn btn-primary"><i className="bi bi-plus"></i>New</Link>
                            </div>

                            <div className="dropdown">
                                <a className="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>



                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4" style={{ width: '50px' }}>
                                                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" htmlFor="contacusercheck"></label></div>
                                            </th>
                                            <th scope="col">Avatar</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Status</th>
                                            <th scope="col" style={{ width: '200px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chatbots}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-0 align-items-center pb-4">
                    <div className="col-sm-6">
                        <div><p className="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-sm-end">
                            <ul className="pagination mb-sm-0">
                                <li className="page-item disabled">
                                    <a href="#" className="page-link"><i className="bi bi-chevron-left"></i></a>
                                </li>
                                <li className="page-item active"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item">
                                    <a href="#" className="page-link"><i className="bi bi-chevron-right"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            














            {/* <div className="card recent-sales overflow-auto">
                <div className="card-body">
                    <h5 className="card-title">Your Chatbots</h5>

                    <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns"><div className="datatable-top">
                    </div>
                    <div className="datatable-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" data-sortable="true">
                                        <button className="datatable-sorter">Avatar</button>
                                    </th>
                                    <th scope="col" data-sortable="true">
                                        <button className="datatable-sorter">Name</button>
                                    </th>
                                    <th scope="col" data-sortable="true" aria-sort="ascending" className="datatable-ascending">
                                        <button className="datatable-sorter">Description</button>
                                    </th>
                                    <th scope="col" data-sortable="true">
                                        <button className="datatable-sorter">Created At</button>
                                    </th>
                                    <th scope="col" data-sortable="true" className="red">
                                        <button className="datatable-sorter">Status</button>
                                    </th>
                                    <th scope="col" data-sortable="true">
                                        <button className="datatable-sorter">Actions</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {chatbots}
                            </tbody>
                        </table>
                    </div>

                    <div className="datatable-bottom">
                        <div className="datatable-info">Showing 1 to 5 of 5 entries</div>
                        <nav className="datatable-pagination"><ul className="datatable-pagination-list"></ul></nav>
                    </div>
                    </div>

                </div>
            </div> */}
        </main>
    )
}

export default ListChatbotPage; 