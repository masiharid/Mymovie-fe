import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';
function TheatresList() {
  const [theatres = [], setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())

    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  }
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading())
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
    
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return 'Approved'
        } else {
          return 'Pending/Blocked'
        }
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div className="flex gap-1">
          {record.isActive && 
          <span className="underline" 
          onClick={() => handleStatusChange(record)}
          > Block</span>}
          {!record.isActive &&
          <span className="underline" 
          onClick={() => handleStatusChange(record)}
          > Approve</span>}

        </div>
      }
    }

  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>

      <Table dataSource={theatres} columns={columns} />

    </div>
  )
}

export default TheatresList
