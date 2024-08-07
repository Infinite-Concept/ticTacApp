// import axios from "axios";

// export const useFetchHistory = async (profile, setHistory) => {
//     try {
//         let response = await axios.get(`http://192.168.1.36:5678/history/get-scored/${profile._id.toString()}`)
//         let data = await response.data 
//         if (data.success) {
//             setHistory(data.message);
//             console.log("History updated:", data.message);
//         } else {
//             console.error("Failed to fetch history:", data.message);
//         }
//     } catch (error) {
//         console.error("Error fetching history:", error);
//     }
// }


import axios from "axios";
import { useEffect } from "react";

export const useFetchHistoryEffect = (profile, setHistory) => {
    useEffect(() => {
        const fetchHistory = async () => {
            if (!profile || !profile._id) {
                console.error("Profile ID is not available.");
                return;
            }

            try {
                let response = await axios.get(`http://192.168.1.36:5678/history/get-scored/${profile._id}`);
                let data = response.data;
                
                if (data.success) {
                    setHistory(data.message);
                    console.log("History updated:", data.message);
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

export const useFetchHistory = (profile) => {
    useEffect(() => {
        const fetchHistory = async () => {
            if (!profile || !profile._id) {
                console.error("Profile ID is not available.");
                return;
            }

            try {
                let response = await axios.get(`http://192.168.1.36:5678/history/get-scored/${profile._id}`);
                let data = response.data;
                
                if (data.success) {
                    console.log("History updated:", data.message);
                } else {
                    console.error("Failed to fetch history:", data.message);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [profile]);
};
