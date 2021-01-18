import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api  from '../api';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditsubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost({
                title, description,
            }, id);
            history.push('/');
        } catch {
            alert('Failed to edit post!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOnePost(id).then(res => {
            const result = res.data;
            const post = res.data;
            setTitle(post.title);
            setDescription(post.description);
        })
    }, []);

    return (
      <AppContainer
        title="EDIT POST"
      >
          <form>
              <div className="form-group">
                  <label>
                      Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
              </div>
              <div className="form-group">
                  <label>
                      Description
                  </label>
                  <textarea
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  >
              </textarea>
              </div>
              <div className="form-group">
                  <button
                  type="button"
                  className="btn btn-success"
                  onClick={onEditsubmit}
                  disabled={loading}
                  >
                    {loading ? 'LOADING...' : 'Edit'}
                  </button>
              </div>
          </form>
     </AppContainer>
    );
};

export default Edit;
