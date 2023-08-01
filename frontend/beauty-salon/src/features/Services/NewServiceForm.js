import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewServiceMutation } from '../services/ServicesApiSlice';
import { FaSave } from 'react-icons/fa';

const NewServiceForm = ({ users }) => {
  const [addNewService, { isLoading, isSuccess, isError, error }] =
    useAddNewServiceMutation();

  const navigate = useNavigate();

  const [desiredService, setDesiredService] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setDesiredService('');
      setText('');
      setUserId('');
      navigate('/dashboard/services');
    }
  }, [isSuccess, navigate]);

  const onDesiredServiceChanged = (e) =>
    setDesiredService(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [desiredService, text, userId].every(Boolean) && !isLoading;

  const onSaveServiceClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewService({ user: userId, desiredService, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    );
  });

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validDesiredServiceClass = !desiredService
    ? 'form__input--incomplete'
    : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  const content = (
    <>
      <p className={errClass}>{error?.data?.text}</p>

      <form className="form" onSubmit={onSaveServiceClicked}>
        <div className="form__desiredService-row">
          <h2>New Service</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              desiredService="Save"
              disabled={!canSave}
            >
              <FaSave />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="desiredService">
          DesiredService:
        </label>
        <input
          className={`form__input ${validDesiredServiceClass}`}
          id="desiredService"
          name="desiredService"
          type="text"
          autoComplete="off"
          value={desiredService}
          onChange={onDesiredServiceChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewServiceForm;
