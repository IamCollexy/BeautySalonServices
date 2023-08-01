import { useState, useEffect } from 'react';
import {
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from './ServicesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTrash } from 'react-icons/fa';

const EditServiceForm = ({ service, users }) => {
  const [updateService, { isLoading, isSuccess, isError, error }] =
    useUpdateServiceMutation();

  const [
    deleteService,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteServiceMutation();

  const navigate = useNavigate();

  const [desiredService, setDesiredService] = useState(
    service.desiredService
  );
  const [text, setText] = useState(service.text);
  const [completed, setCompleted] = useState(service.completed);
  const [userId, setUserId] = useState(service.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setDesiredService('');
      setText('');
      setUserId('');
      navigate('/dash/services');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onDesiredServiceChanged = (e) =>
    setDesiredService(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [desiredService, text, userId].every(Boolean) && !isLoading;

  const onSaveServiceClicked = async (e) => {
    if (canSave) {
      await updateService({
        id: service.id,
        user: userId,
        desiredService,
        text,
        completed,
      });
    }
  };

  const onDeleteServiceClicked = async () => {
    await deleteService({ id: service.id });
  };

  const created = new Date(service.createdAt).toLocaleString(
    'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  );
  const updated = new Date(service.updatedAt).toLocaleString(
    'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  );

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validDesiredServiceClass = !desiredService
    ? 'form__input--incomplete'
    : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  const errContent =
    (error?.data?.message || delerror?.data?.message) ?? '';

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__desiredService-row">
          <h2>Edit Service #{service.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              desiredService="Save"
              onClick={onSaveServiceClicked}
              disabled={!canSave}
            >
              <FaSave />
            </button>
            <button
              className="icon-button"
              desiredService="Delete"
              onClick={onDeleteServiceClicked}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <label
          className="form__label"
          htmlFor="service-desiredService"
        >
          DesiredService:
        </label>
        <input
          className={`form__input ${validDesiredServiceClass}`}
          id="service-desiredService"
          name="desiredService"
          type="text"
          autoComplete="off"
          value={desiredService}
          onChange={onDesiredServiceChanged}
        />

        <label className="form__label" htmlFor="service-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="service-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="service-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="service-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="service-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="service-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditServiceForm;
