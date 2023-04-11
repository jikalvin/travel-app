import { useState, useEffect } from 'react'
import Card from "components/card";
import MiniCalendar from "components/calendar/MiniCalendar";
import { Input } from "@material-tailwind/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase"
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { query, where } from "firebase/firestore";
 
export default function ScheduleTravel() {
    const navigate = useNavigate();
    const [curr, setCurr] = useState()

    const [image, setImage] = useState("")
    const [tdate, setTdate] = useState()
    const [rdate, setRdate] = useState()
    const [price, setPrice] = useState()
    const [ttime, setTtime] = useState()
    const [ttown, setTtown] = useState()
    const [atown, setAtown] = useState()
    const [iupload, setIupload] = useState()

    const auth = getAuth();
    const user = auth.currentUser;
    let email = ""

    if (user) {
        email = user.email;
        console.log(email);
    } else {
        console.log("No user is currently signed in.");
    }

    async function getUser(){
        const q = query(collection(db, "users"), where("email", "==", email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setCurr(doc.data())
        })
    }

    useEffect(() => {
        getUser()
    }, []);

    const handleTakeOff = (d) => {
        setTdate(d)
    }

    const handleArrival = (d) => {
        setRdate(d)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
       
        const metadata = {
            contentType: 'image/jpeg'
        };
          
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + iupload);
        const uploadTask = uploadBytesResumable(storageRef, iupload, metadata);
          
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              console.log(error)
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImage(downloadURL)
                console.log('File available at', downloadURL);
                console.log(image)
              })
              .then(async () => {
                try {
                    const docRef = await addDoc(collection(db, "travels"), {
                      tdate: tdate,
                      rdate: rdate,
                      price: price,
                      ttime: ttime,
                      ttown: ttown,
                      atown: atown,
                      image: image,
                      email: email    
                    });
                    console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
            })
            .then(navigate("/admin/data-tables"))
            .catch((e) => console.log(e))
            }
        );
    }

  return (
    <>
    <Card>
        <div>
            <div className="flex flex-row justify-between align-center">
                <MiniCalendar title={"Take Off Date"} type="tdate" handleTakeOff={handleTakeOff} />
                <MiniCalendar title={"Return Date"} type="rdate" handleArrival={handleArrival} />
            </div>
            <div class="flex flex-row justify-between align-center -mx-3 mb-2 my-[50px]">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Price
            </label>
            <input 
                onChange={(e) => setPrice(e.target.value)} 
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Take off time
            </label>
            <input 
                onChange={(e) => setTtime(e.target.value)}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Take off town
            </label>
            <div class="relative">
                <select 
                    onChange={(e) => {setTtown(e.target.value)}}
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Arrival Town
            </label>
            <div class="relative">
                <select
                    onChange={(e) => {setAtown(e.target.value)}}
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            </div>
            <div class="w-full">
                <label
                    class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <span class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span class="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span class="text-blue-600 underline">browse</span>
                        </span>
                    </span>
                    <input
                        onChange={(e) => {setIupload(e.target.value)}} 
                        type="file" name="file_upload" class="hidden"
                    />
                </label>
            </div>
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                onClick={onSubmit}
            >
                Create Voyage
            </button>
        </div>
    </Card>
    </>
  );
}