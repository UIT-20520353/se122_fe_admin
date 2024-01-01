import React, { useEffect, useMemo, useState } from "react";
// import SockJS from "sockjs-client/dist/sockjs.js";
// import { Message, over } from "stompjs";
// import { useAppSelector } from "../../../app/hooks";
import userApi from "../../../api/userApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { UserModel } from "../../../models/user";
import { setLoading } from "../../../redux/globalSlice";
import UserCart from "../components/UserCart";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
// import { MessageRequest, MessageResponse } from "../../../models/message";
// import { selectProfile } from "../../../redux/globalSlice";

interface IHomePageProps {}

interface DataProps {
  users: UserModel[];
  totalUsers: number;
}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const [data, setData] = useState<DataProps>({ users: [], totalUsers: 0 });
  const [page, setPage] = useState<number>(0);
  const [statusButtons, setStatusButtons] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [tab, setTab] = useState<number>(0);

  // const profile = useAppSelector(selectProfile);

  // const stompClient = useMemo(
  //   () => over(new SockJS("http://localhost:8080/ws")),
  //   []
  // );
  // stompClient.debug = () => {};
  // const connect = () => {
  //   stompClient.connect({}, onConnected, onError);
  // };

  // const onMessageReceived = (payload: Message) => {
  //   const payloadData: MessageResponse = JSON.parse(payload.body);
  //   console.log(payloadData);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onError = (error: any) => {
  //   console.log(error);
  // };

  // const onConnected = () => {
  //   if (profile?.id)
  //     stompClient.subscribe(`/user/${profile.id}/private`, onMessageReceived);
  // };

  // const sendMessage = () => {
  //   const message: MessageRequest = {
  //     message: "Hello",
  //     type: "MESSAGE",
  //     token: "dasdasdad",
  //   };

  //   try {
  //     stompClient.send("/app/message", {}, JSON.stringify(message));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   connect();
  //   return () => {
  //     if (stompClient.connected) {
  //       stompClient.disconnect(() => {});
  //     }
  //   };
  // }, [profile?.id]);

  const handleChangePage = (type: "INCREASE" | "DECREASE") => {
    switch (type) {
      case "INCREASE":
        setPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
        break;
      case "DECREASE":
        setPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
        break;
      default:
        break;
    }
  };

  const updateStatusButtons = (index: number) => {
    setStatusButtons((prev) => {
      const temp = [...prev];
      temp[index] = !prev[index];
      return temp;
    });
  };

  const fetchData = async (page: number) => {
    setStatusButtons([false, false, false]);
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await userApi.getListUserForRequest(
      {
        size: 3,
        page,
      }
    );
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({ users: body, totalUsers: pagination.total });
    } else {
      handleResponseError(error);
    }
  };

  const totalPages = useMemo(() => {
    return Math.ceil(data.totalUsers / 3);
  }, [data.totalUsers]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="home-page">
      <div className="tabs">
        <button
          className={`tab ${!tab ? "active" : ""}`}
          onClick={() => setTab(0)}
        >
          Recommend
        </button>
        <button
          className={`tab ${tab ? "active" : ""}`}
          onClick={() => setTab(1)}
        >
          Sent
        </button>
      </div>
      <div className="content">
        <div className="user-list">
          {data.users.map((user, index) => (
            <UserCart
              user={user}
              key={`user-${user.id}`}
              index={index}
              statusButtons={statusButtons}
              updateStatusButtons={updateStatusButtons}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="control-buttons">
            <button
              className="btn"
              onClick={() => handleChangePage("DECREASE")}
            >
              <GrLinkPrevious className="btn__icon" />
            </button>
            <button
              className="btn"
              onClick={() => handleChangePage("INCREASE")}
            >
              <GrLinkNext className="btn__icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
