import { HiOutlineTicket } from "@react-icons/all-files/hi/HiOutlineTicket";
import { FaDog } from "@react-icons/all-files/fa/FaDog";
import { GiForestCamp } from "@react-icons/all-files/gi/GiForestCamp";
import { GrWheelchair } from "@react-icons/all-files/gr/GrWheelchair";
import { FaRestroom } from "@react-icons/all-files/fa/FaRestroom";
import { BsBookmarks } from "@react-icons/all-files/bs/BsBookmarks";
import { IoCloudyNightOutline } from "@react-icons/all-files/io5/IoCloudyNightOutline";
import { GiCampingTent } from "@react-icons/all-files/gi/GiCampingTent";
import { RiParkingBoxLine } from "@react-icons/all-files/ri/RiParkingBoxLine";

export default function Amenities({ selected, onChange }) {
    function checkboxClickHandler(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
            console.log(name);
        } else {
            onChange([
                ...selected.filter((selectedName) => selectedName !== name),
            ]);
        }
    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <GrWheelchair className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("wheelchair")}
                    name="wheelchair"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Wheelchair</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <RiParkingBoxLine className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("parking")}
                    name="parking"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Parking</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <GiCampingTent className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("campsite")}
                    name="campsite"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Campsite</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <IoCloudyNightOutline className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("night usage")}
                    name="night usage"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Night usage</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <HiOutlineTicket className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("permit required")}
                    name="permit required"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Permit required</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <FaDog className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("pets")}
                    name="pets"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Pets Allow</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <GiForestCamp className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("backcountry")}
                    name="backcountry"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Backcountry</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <BsBookmarks className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("guide mark")}
                    name="guide mark"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Guide mark</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <FaRestroom className="" />
                <input
                    type="checkbox"
                    checked={selected.includes("restroom")}
                    name="restroom"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Restroom</span>
            </label>
        </>
    );
}
