import React, { useCallback, useContext, useEffect, useState } from 'react';

import { DashboardLayout } from '../../components/dashboard-layout';
import { Table } from 'react-bootstrap';

import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import Link from 'next/link';
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from '../../components/checklogin/checklogin.js';
const Admin = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
    console.log(Tokens);

    const [admin, setadmin] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([])




    // get order render
    const getadmin = useCallback(() => {
        fetch(apiKey + 'api/admin/adminlist/')
            .then((res) => res.json())
            .then((data) => setadmin(data.result))
    }, [])

    useEffect(() => {
        setloaderspage(true)
        if (Tokens === '') {

        } else {
            text(Tokens)
            getadmin()
        }

    }, [Tokens])
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll)
        setIsCheck(admin.map((li) => li._id))
        if (isCheckAll) {
            setIsCheck([])
        }
    }
    console.log(isCheck);
    console.log(isCheckAll);



    const handleClick = e => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id))
        }
    }

    // delete admin
    function deleteadmin() {
        const adminids = { 'adminid': isCheck }
        fetch(`${apiKey}api/admin/admindelete/`, {
            method: 'DELETE',
            body: JSON.stringify(adminids),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            getadmin();
        })
    }


    return (<>
        {
            loaderspage ? (
                <>
                    <Checklogin />
                    <div className="loader loader1"></div>
                </>
            ) : (

                <div className="p-4 admin-table">
                    <div className="header_backend">
                    <div className="d-flex justify-content-between my-4">

                        <DropdownButton
                            alignRight
                            title="Action"
                            id="dropdown-menu-align-right"
                            // onSelect={handleSelect}
                            variant="success">
                            <Dropdown.Item onClick={deleteadmin} >Delete</Dropdown.Item>
                            <Dropdown.Item  >Role</Dropdown.Item>
                        </DropdownButton>
                        <Link href="/E4gadmin/addadmin">
                        <button type="button" class="btn btn-info">Add Admin</button>
                        </Link>
                    </div>
                    </div>
                    <Table
                        striped
                        bordered
                        hover
                        size="sm">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        id="selectall"
                                        name="selectall"
                                        onClick={handleSelectAll}
                                        checked={isCheckAll}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Gmail</th>
                                <th>Role</th>

                            </tr>
                        </thead>
                        <tbody>
                            {admin.map((user, index) => (
                                <tr key={index}>
                                    <input type="checkbox"
                                        id={user._id}
                                        name={user.fname}
                                        key={user._id}
                                        onClick={handleClick}
                                        checked={isCheck.includes(user._id)}
                                    />
                                    <td>{`${user.fname} ${user.lname}`}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {

                                            user.admin ? (
                                                <td>Admin</td>
                                            ) : (
                                                ''
                                            )
                                        }
                                        {
                                            user.author ? (
                                                <td>,Authors</td>
                                            ) : (
                                                ''
                                            )
                                        }
                                        {
                                            user.publisher ? (
                                                <td>,Publisher</td>
                                            ) : (
                                                ''
                                            )
                                        }
                                        {
                                            user.modifier ? (
                                                <td>,Modifier</td>
                                            ) : (
                                                ''
                                            )
                                        }

                                    </td>
                                    <td>
                                        <Link href={`/E4gadmin/editadmin/${user._id}`}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            }


                        </tbody>
                    </Table>
                </div>
            )
        }

    </>
    )
};



const text = (token) => {
    if (!token) {

    }
    else {
        Admin.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
    }
}

export default Admin;
