import React from "react";
import "./styles.css";
import Modal from "./Modal/Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchError: false,
      users: [],
      usersPerm: [],
      n: 0,
      count1: 0,
      count2: 0,
      usersPerPage: 5,
      currentPage: 1,
      isOpen: false,
      id: 0
    };

    this.getUsers();
  }

  getUsers = () => {
    fetch("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        let data1 = data.slice();
        this.setState({ users: data });
        this.setState({ usersPerm: data1 });
      })
      .catch(() => {
        this.setState({ fetchError: true });
      });
  };

  search = (e) => {
    let inputValue = e.target.value.toLowerCase();
    let arr = this.state.users;
    arr = arr.filter((item) => {
      let name = item.username.toLowerCase();
      let mail = item.email.toLowerCase();
      if (name.includes(inputValue) || mail.includes(inputValue)) return item;
    });
    this.setState({ users: arr });
    this.setState({ n: 1 });
  };

  reset = () => {
    let arr = this.state.usersPerm.slice();
    this.setState({ users: arr });
    this.setState({ n: 0 });
    document.getElementById("input").value = "";
    this.setState({ count1: 0 });
    this.setState({ count2: 0 });
  };

  dateSort = () => {
    let arr = this.state.users;
    arr.sort((a, b) => (a.registration_date > b.registration_date ? 1 : -1));
    if (this.state.count1 % 2 === 1) {
      arr.reverse();
    }
    this.setState({ count1: this.state.count1 + 1 });
    this.setState({ users: arr });
    this.setState({ n: 1 });
  };

  ratingSort = () => {
    let arr = this.state.users;
    arr.sort((a, b) => a.rating - b.rating);
    if (this.state.count2 % 2 === 1) {
      arr.reverse();
    }
    this.setState({ count2: this.state.count2 + 1 });
    this.setState({ users: arr });
    this.setState({ n: 1 });
  };

  paginate = (item) => {
    this.setState({ currentPage: item });
  };

  cancel = () => {
    this.setState({ isOpen: false });
  };

  confirm = () => {
    let arr = this.state.users;
    let arr1 = this.state.usersPerm;
    arr = arr.filter((item) => item.id !== this.state.id);
    arr1 = arr1.filter((item) => item.id !== this.state.id);
    this.setState({ users: arr });
    this.setState({ usersPerm: arr1 });
    this.setState({ isOpen: false });
  };

  render() {
    let LastUserIndex = this.state.currentPage * this.state.usersPerPage;
    let FirstUserIndex = LastUserIndex - this.state.usersPerPage;
    let currentUsers = this.state.users.slice(FirstUserIndex, LastUserIndex);
    let pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.users.length / this.state.usersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (this.state.fetchError)
      return (
        <div className="App">
          <h1 className="error">Что-то пошло не так...</h1>
        </div>
      );
    return (
      <div className="App">
        <div className="Users-list">
          <div className="header">Список пользователей</div>
          <div className="search-bar">
            <div className="search">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 15.5L20 19"
                  stroke="#9EAAB4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 11C6 14.3137 8.68629 17 12 17C13.6597 17 15.1621 16.3261 16.2483 15.237C17.3308 14.1517 18 12.654 18 11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11Z"
                  stroke="#9EAAB4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                id="input"
                className="input"
                placeholder="Поиск по имени или e-mail"
                onChange={this.search}
              />
            </div>
            {(() => {
              if (this.state.n === 1) {
                return (
                  <div className="reset" onClick={this.reset}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7516 10.3388L11.6048 11.0743L11.7516 10.3388ZM12.9524 11.0549C12.7453 11.4137 12.8682 11.8723 13.2269 12.0795C13.5856 12.2866 14.0443 12.1637 14.2514 11.8049L12.9524 11.0549ZM2.80385 15.9282L2.3426 15.3368C2.14591 15.4902 2.03836 15.7314 2.05565 15.9802C2.07295 16.229 2.21283 16.453 2.42885 16.5777L2.80385 15.9282ZM13.1962 21.9282L12.8212 22.5777C13.0372 22.7024 13.3011 22.7116 13.5252 22.6022C13.7494 22.4927 13.9044 22.279 13.9389 22.032L13.1962 21.9282ZM7.47027 12.6457L13.7057 16.2457L14.4557 14.9467L8.22027 11.3467L7.47027 12.6457ZM14.7835 15.8579C15.0271 15.2036 15.2382 14.1578 15.0904 13.0821C14.9394 11.9824 14.402 10.8101 13.1157 10.0675L12.3657 11.3665C13.158 11.8239 13.5002 12.528 13.6044 13.2862C13.7118 14.0686 13.5536 14.8623 13.3778 15.3345L14.7835 15.8579ZM13.1157 10.0675C12.714 9.83552 12.3056 9.68456 11.8983 9.60331L11.6048 11.0743C11.8487 11.123 12.1032 11.2149 12.3657 11.3665L13.1157 10.0675ZM11.8983 9.60331C10.8236 9.38892 9.83044 9.67142 9.04783 10.0841C8.26814 10.4953 7.64439 11.0621 7.26721 11.5183L8.42334 12.474C8.68958 12.152 9.16296 11.7192 9.74755 11.4109C10.3292 11.1042 10.9674 10.9472 11.6048 11.0743L11.8983 9.60331ZM12.4011 10.7138L15.1513 5.95032L13.8522 5.20032L11.102 9.96381L12.4011 10.7138ZM15.1513 5.95032C15.1845 5.8928 15.2205 5.82406 15.2429 5.7824C15.2695 5.73269 15.2911 5.6939 15.3125 5.6596C15.3578 5.58674 15.3792 5.57245 15.3739 5.57627C15.3681 5.58037 15.356 5.5875 15.3395 5.59247C15.3227 5.59754 15.314 5.59656 15.3194 5.59683C15.3355 5.59762 15.4294 5.60837 15.625 5.72131L16.375 4.42227C16.051 4.23522 15.7233 4.11481 15.3928 4.09862C15.0435 4.08152 14.7423 4.18378 14.5012 4.35622C14.2767 4.51682 14.1311 4.71886 14.0388 4.86723C13.9914 4.94355 13.9515 5.0166 13.9211 5.07314C13.8865 5.13773 13.87 5.16963 13.8522 5.20032L15.1513 5.95032ZM15.625 5.72131C15.8392 5.84499 15.9206 5.92877 15.9448 5.95991C15.9562 5.97456 15.9313 5.94274 15.9318 5.88614C15.9322 5.85263 15.9424 5.86019 15.9028 5.94131C15.8842 5.97926 15.8599 6.02337 15.8263 6.08087C15.8031 6.12065 15.7453 6.21749 15.7125 6.27432L17.0115 7.02432C17.0637 6.93394 17.1742 6.75586 17.2504 6.60009C17.333 6.43106 17.4291 6.18882 17.4318 5.90007C17.438 5.23014 16.9691 4.76526 16.375 4.42227L15.625 5.72131ZM15.7125 6.27432L12.9524 11.0549L14.2514 11.8049L17.0115 7.02432L15.7125 6.27432ZM7.38402 11.4048L2.3426 15.3368L3.2651 16.5196L8.30652 12.5876L7.38402 11.4048ZM13.9389 22.032L14.8234 15.7L13.3379 15.4924L12.4534 21.8244L13.9389 22.032ZM2.42885 16.5777L5.02692 18.0777L5.77692 16.7787L3.17885 15.2787L2.42885 16.5777ZM5.02692 18.0777L7.625 19.5777L8.375 18.2787L5.77692 16.7787L5.02692 18.0777ZM7.625 19.5777L10.2231 21.0777L10.9731 19.7787L8.375 18.2787L7.625 19.5777ZM10.2231 21.0777L12.8212 22.5777L13.5712 21.2787L10.9731 19.7787L10.2231 21.0777Z"
                        fill="black"
                      />
                      <path
                        d="M5.65192 16.9952L7.76795 15.3301"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10.8481 19.9952L11.2321 17.3301"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.25 18.4952L9 17.1962"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <div>Очистить фильтр</div>
                  </div>
                );
              }
            })()}
          </div>
          <div className="sorting">
            <div className="sorting-header">Сортировка:</div>
            <div className="sorting-types" onClick={this.dateSort}>
              Дата регистрации
            </div>
            <div className="sorting-types" onClick={this.ratingSort}>
              Рейтинг
            </div>
          </div>
          <div className="users">
            <div className="container2">
              <div className="name">Имя пользователя</div>
              <div className="mail">E-mail</div>
              <div className="date">Дата регистрации</div>
              <div className="rate">Рейтинг</div>
              <div className="line"></div>
            </div>
            {currentUsers.map((item) => (
              <div className="container" key={item.id}>
                <div className="name">{item.username}</div>
                <div className="mail">{item.email}</div>
                <div className="date">
                  {item.registration_date.slice(8, 10) +
                    "." +
                    item.registration_date.slice(5, 7) +
                    "." +
                    item.registration_date.slice(2, 4)}
                </div>
                <div className="rate">{item.rating}</div>
                <div
                  className="icon1"
                  onClick={() => this.setState({ isOpen: true, id: item.id })}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4L20 20"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 20L20 4"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="line"></div>
              </div>
            ))}
            <div className="pagination">
              {pageNumbers.map((item) => (
                <div className="page-item" onClick={() => this.paginate(item)}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          cancel={this.cancel}
          confirm={this.confirm}
        />
      </div>
    );
  }
}

export default App;
