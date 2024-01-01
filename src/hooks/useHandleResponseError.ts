import { useCallback } from "react";
import { HttpError } from "../models/http";
import { useAppDispatch, useErrTranslation } from "../app/hooks";
import { showErrorModal } from "../components/modals/CommonModals";
import { logout } from "../redux/globalSlice";
import { useNavigate } from "react-router-dom";

const useHandleResponseError = (title: string | null = null) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const et = useErrTranslation();

  const handleOK = () => {
    dispatch(logout());
    navigate("/login");
  };

  return useCallback(
    (error?: HttpError, onOk?: () => void) => {
      if (!error) {
        return null;
      }

      if (error.unauthorized) {
        if (
          error.message ===
          "Full authentication is required to access this resource"
        ) {
          handleOK();
          return undefined;
        }

        showErrorModal({
          content: et(error.message),
          onOk,
          title:
            title ??
            et(error.title || "", {
              defaultValue: et("defaultMessage.title"),
            }),
          className: "modal--error",
        });
      }

      if (error.serverError || (error.badRequest && !error.fieldErrors)) {
        showErrorModal({
          content: et(error.message),
          onOk,
          title:
            title ??
            et(error.title || "", {
              defaultValue: et("defaultMessage.title"),
            }),
          className: "modal--error",
        });
      }

      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, et]
  );
};

export { useHandleResponseError };
