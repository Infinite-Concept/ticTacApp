
import axios from "axios";
import { useEffect } from "react";
import { envValue } from "../../env";

export const useFetchHistoryEffect = (profile, setHistory) => {
    useEffect(() => {
        const fetchHistory = async () => {

            try {
                let response = await axios.get(`${envValue}/history/user-stats/${profile._id}`);
                let data = response.data;
                
                if (data.success) {
                    setHistory(data.message);
                } else {
                    console.error("Failed to fetch history:", data.message);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [profile, setHistory]);
};

export const useFetchHistory = (profile, setHistoryBoard) => {
    useEffect(() => {
        const fetchHistory = async () => {

            try {
                let response = await axios.get(`${envValue}/history/limit-history/${profile._id}`);
                let data = response.data;
                
                if (data.success) {
                    setHistoryBoard(data.message)
                } else {
                    console.error("Failed to fetch history:", data.message);
                    setHistoryBoard([])
                }
            } catch (error) {
                console.error("Error fetching history:", error);
                setHistoryBoard([])
            }
        };

        fetchHistory();
    }, [profile]);
};
