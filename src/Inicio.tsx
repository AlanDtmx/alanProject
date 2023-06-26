import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import styles from './Inicio.module.css';


function Inicio(){

    const[List, setList] = useState([{ id: '0',  title: 'nenhum',  thumbnail: 'nenhuma', description: 'nenhuma', platform: '', genre: '' }]);
    const[Show, setShow] = useState(false);
    const[Loading, setLoad] = useState(true);
    const[Error, setError] = useState(false);
    const[messageError, setMessageError] = useState('');
    const[Sucess, setSucess] = useState(false);
    const[exceededTime, setExceededTime] = useState(false);
    const useRefProgressFill = useRef<any>(null);
    const useRefProgressText = useRef<any>(null);
    

    var intervalRef;




    useEffect(() => {

        const timer = setTimeout(() => {
            setExceededTime(true);
            setLoad(false);
        }, 5000);

        const fetchData = async () => {
          try {
            const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
            const headers = {
              'dev-email-address': 'alan.dtmx@gmail.com'
            };
    
            const response = await axios.get(url, { headers });

            var ListTmp = [{ id: '0',  title: 'nenhum',  thumbnail: 'nenhuma', description: 'nenhuma', platform: '', genre: '' }];
            ListTmp.length = 0;

            response.data.forEach(game => {
                const tmp = {
                    id: game.id,
                    title: game.title,
                    thumbnail: game.thumbnail,
                    description: game.short_description,
                    platform: game.platform,
                    genre: game.genre
                };
                ListTmp.push(tmp);
            });

            setList(ListTmp);
            clearTimeout(timer);
            if( !exceededTime ){

                setShow(true);
                setSucess(true);
            }
            
          } catch (error) {
            console.error(error);

            setMessageError(error.message);
            setShow(false);
            setLoad(false);
            setError(true);

          }
        };
    
        fetchData();
     }, []);

    useEffect(() => {
        const animateProgressBar = () => {
        if (useRefProgressFill.current && useRefProgressText.current) {
            const progressBar = useRefProgressFill.current;
            const progressText = useRefProgressText.current;

            let currentProgress = parseInt(progressText.textContent || '0', 10);
            currentProgress += 1;

            progressBar.style.width = currentProgress + '%';
            progressText.textContent = currentProgress + '%';

            if (currentProgress >= 100) {
                clearInterval(intervalRef);
                if( Sucess && !exceededTime ) {
                    
                    setLoad(false);
                    setShow(true);
                } else {
                    setLoad(false);
                }
            }
        }
        };

        if (Loading) {
            intervalRef = setInterval(() => {
                animateProgressBar();
            }, 50);
        }

        return () => {
        clearInterval(intervalRef);
        };
  }, [Loading]);


    return (
        <div>
        
            {Loading ? (
                <>
                <div className={styles.progressBar}>
                        <div className={styles.progressText} ref={useRefProgressText}>0%</div>
                    <div className={styles.progressFill} ref={useRefProgressFill}></div>
                   
                </div>
                




                </>
            ) : (
                <>
            <div className={styles.gridContent}>
                {Show ? (
                    <>
                    {List.map(Game => 
                        <>
                            <div className={styles.card} id={Game.id}>
                                <img src={Game.thumbnail} className={styles.cardThumbnail}>
                                </img>
                                < br />
                                <h2 className={styles.cardTitle}>{Game.title}</h2>
                                <br />
                                <div className={styles.cardDivDescription}>
                                    <label>{Game.description}</label>
                                </div>

                                


                                <div className={styles.cardCointainerFooter}>

                                    <div className={styles.cardType}>
                                        <label className={styles.cardLabelType}>{Game.genre}</label>
                                    </div>

                                    <div className={styles.cardPlatform}>
                                        <label className={styles.cardLabelPlatform}>{Game.platform}</label>
                                    </div>
                                </div>

                            </div>
                        </>    
                    )}
                    </>
                ) : (
                    <>{Error ? (
                        <span className={styles.erro}>{messageError}</span>
                    ) : (
                        <span className={styles.erro}>O servidor demorou para responder, tente mais tarde!</span>
                    )}
                    
                    
                    </>
                )}
            </div>
                </>
                
            )}
             


        </div>
    );
}

export default Inicio;