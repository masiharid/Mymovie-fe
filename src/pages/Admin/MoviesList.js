import React, { useState, useEffect } from 'react'
import { message, Table } from 'antd';
import Button from '../../components/Button'
import MovieForm from './MovieForm';
import { AddMovie } from '../../apicalls/movies';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { GetAllMovies } from '../../apicalls/movies';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { DeleteMovie } from '../../apicalls/movies';
function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState('add');

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())

    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  }
  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading())
      const response = await DeleteMovie( {movieId,} );
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
  const cloumns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return <img 
        src={record.poster} 
        alt="poster"
        width='60'
        height='60'
        className="br-1" />
      }
    },
    {
      title: "Name",
      dataIndex: "title",

    },
   
    {
      title: "Description",
      dataIndex: "description",

    },

    {
      title: "Duration",
      dataIndex: "duration",

    },
    {
      title: "Genre",
      dataIndex: "genre",

    },
    {
      title: "Language",
      dataIndex: "language",

    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY")
      }

    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div className="flex gap-1">
          <i className="ri-delete-bin-line"
          onClick={() => handleDelete(record._id)}></i>
          <i className="ri-pencil-line"
          onClick={() => { 
            setSelectedMovie(record);
            setFormType("edit")
            setShowMovieFormModal(true); 
             }}></i>
        </div>
      }
    }

  ]
  useEffect(() => {
getData()
  }
    , [])

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        />
      </div>
      <Table
        columns={cloumns}
        dataSource={movies}
      />
      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}

        />
      )}
    </div>
  )
}

export default MoviesList
