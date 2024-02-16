const pool = require('../../config/db')

const handleSelectQuery = (percent, currentDate, res) => {
    console.log("data=====",percent,currentDate)
    percent = isNaN(parseInt(percent, 10)) ? 5 : parseInt(percent, 10);
    percent = (percent < 0 || percent > 100) ? 5 : percent;
    console.log("Percent:", percent, "on Date:", currentDate);
    percent = percent / 100;
    console.log("new percent", percent);

    const selectQuery = `
        SELECT 
        CASE 
            WHEN COUNT(*) < 10 THEN 0
            ELSE FLOOR(COUNT(*) * ?) 
        END AS NumberOfUser
        FROM tbl_subscription
        WHERE DATE(sub_date_time) = ?
        AND PASSWORD<>'123';
    `;

    pool.query(selectQuery, [percent, currentDate], (selectError, selectResults) => {
        if (selectError) {
            return res.status(500).json({ error: selectError.message });
        }
        res.json({ totalSubscriptions: selectResults[0].NumberOfUser });
    });
};

module.exports={
    totalSubscriptions: (req, res) => {
        const currentDate = req.body.mis_date;
    
        const selectLastDropPercentQuery = `
            SELECT dropPercent 
            FROM tbl_ratio_datetime 
            WHERE DATE(date_time) = ? 
            ORDER BY id DESC LIMIT 1;
        `;
    
        pool.query(selectLastDropPercentQuery, [currentDate], (selectError, selectResults) => {
            if (selectError) {
                return res.status(500).json({ error: selectError.message });
            }
    
            const lastDropPercent = selectResults[0] ? selectResults[0].dropPercent : null;
    
            // Check if lastDropPercent is null, then fetch it from yesterday
            if (lastDropPercent === null) {
                const yesterday = new Date(new Date(currentDate).getTime() - 24 * 60 * 60 * 1000);
                const yesterdayDate = yesterday.toISOString().slice(0, 10);
    
                const selectYesterdayDropPercentQuery = `
                    SELECT dropPercent 
                    FROM tbl_ratio_datetime 
                    WHERE DATE(date_time) = ? 
                    ORDER BY id DESC LIMIT 1;
                `;
    
                pool.query(selectYesterdayDropPercentQuery, [yesterdayDate], (yesterdaySelectError, yesterdaySelectResults) => {
                    if (yesterdaySelectError) {
                        return res.status(500).json({ error: yesterdaySelectError.message });
                    }
    
                    const yesterdayDropPercent = yesterdaySelectResults[0] ? yesterdaySelectResults[0].dropPercent : null;
    
                    handleSelectQuery(yesterdayDropPercent, currentDate, res);
                });
            } else {
                handleSelectQuery(lastDropPercent, currentDate, res);
            }
        });
    },
    
    
    totalSub: (req, res) => {
        const inputPercent = req.body.percent;
    
        const currentDatetime = new Date().toISOString();
        const currentDate = new Date(currentDatetime).toISOString().split("T")[0]
    
        if (inputPercent !== undefined && inputPercent !== null && inputPercent.trim() !== "") {
    
          
            const insertQuery = `
                INSERT INTO tbl_ratio_datetime (dropPercent,date, date_time) 
                VALUES (?, ?,now());
            `;
    
            pool.query(insertQuery, [inputPercent,currentDate, currentDatetime], (insertError, insertResults) => {
                if (insertError) {
                    return res.status(500).json({ error: insertError.message });
                }
    
               
    
                const selectDropPercentQuery = `
                    SELECT dropPercent 
                    FROM tbl_ratio_datetime 
                    WHERE DATE(date_time) = ? 
                    ORDER BY id DESC LIMIT 1;
                `;
    
                pool.query(selectDropPercentQuery, [currentDate], (selectError, selectResults) => {
                    if (selectError) {
                        return res.json({ error: selectError.message });
                    }
    
                    const dropPercent = selectResults[0] ? selectResults[0].dropPercent : null;
    
                    if (dropPercent !== null) {
    
                        handleSelectQuery(inputPercent, currentDate, res);
                    } 
                    else {
    
                        const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                        const yesterdayDate = yesterday.toISOString().slice(0, 10);
    
                        const selectYesterdayDropPercentQuery = `
                            SELECT dropPercent 
                            FROM tbl_ratio_datetime 
                            WHERE DATE(date_time) = ? 
                            ORDER BY id DESC LIMIT 1;
                        `;
    
                        pool.query(selectYesterdayDropPercentQuery, [yesterdayDate], (yesterdayDropSelectError, yesterdayDropSelectResults) => {
                            if (yesterdayDropSelectError) {
                                return res.status(500).json({ error: yesterdayDropSelectError.message });
                            }
    
                            const yesterdayDropPercent = yesterdayDropSelectResults[0] ? yesterdayDropSelectResults[0].dropPercent : null;
    
                           
                            handleSelectQuery(yesterdayDropPercent, currentDate, res);
                        });
                    }
                });
            });
        }
        else {
            // Case 2: When inputPercent is not provided
            // Check for dropPercent of the current date
            const selectDropPercentQuery = `
                SELECT dropPercent 
                FROM tbl_ratio_datetime 
                WHERE DATE(date_time) = ? 
                ORDER BY id DESC LIMIT 1;
            `;
    
            pool.query(selectDropPercentQuery, [currentDate], (selectError, selectResults) => {
                if (selectError) {
                    return res.json({ error: selectError.message });
                }
    
                const dropPercent = selectResults[0] ? selectResults[0].dropPercent : null;
    
                if (dropPercent !== null) {
                    // Case 2.1: If dropPercent is available for the current date
                    // Pass it to the handle function with the current date
                    handleSelectQuery(dropPercent, currentDate, res);
                } else {
                    // Case 2.2: If dropPercent is not available for the current date
                    // Check for dropPercent from yesterday's date
                    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                    const yesterdayDate = yesterday.toISOString().slice(0, 10);
    
                    const selectYesterdayDropPercentQuery = `
                        SELECT dropPercent 
                        FROM tbl_ratio_datetime 
                        WHERE DATE(date_time) = ? 
                        ORDER BY id DESC LIMIT 1;
                    `;
    
                    pool.query(selectYesterdayDropPercentQuery, [yesterdayDate], (yesterdayDropSelectError, yesterdayDropSelectResults) => {
                        if (yesterdayDropSelectError) {
                            return res.status(500).json({ error: yesterdayDropSelectError.message });
                        }
    
                        const yesterdayDropPercent = yesterdayDropSelectResults[0] ? yesterdayDropSelectResults[0].dropPercent : null;
    
                        // Pass the dropPercent from yesterday's date to the handle function with the current date
                        handleSelectQuery(yesterdayDropPercent, currentDate, res);
                    });
                }
            });
        }


       
    },
    
    

    
    

       
  
   
    
    
    
    getRatio: (req, res) => {
       
        const query = `
        SELECT * FROM tbl_ratio
        `;
        pool.query(query,  (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json({ ratio: results });
        });
    },



 
    
}



