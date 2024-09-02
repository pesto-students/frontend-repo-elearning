'use client'
import { useFetchData } from "@/app/api/queryApiData";
import ViewDetails from "@/components/ViewDetails/viewDetails";
import { APIS } from "@/constant";
import { useParams } from 'next/navigation';


const StudentDetails = () => {
    const { studentId } = useParams();
    const { data, isLoading } = useFetchData(`['FETCH_STUDENTS','${studentId}']`, {
        url: APIS.FETCH_STUDENT,
        method: 'POST',
        payload: { _id: studentId }
    });
    console.log(data);
    const student = data ? data[0] : [];
     
    const details = [
        { label: 'Name', value: `${student.firstName} ${student.lastName}` },
        { label: 'Email', value: student.email },
        { label: 'Phone', value: student.phone },
        { label: 'Address', value: student.address },
        { label: 'Pincode', value: student.pincode },
        { label: 'City', value: student.city?.name },
        { label: 'State', value: student.state?.name },
        { label: 'Country', value: student.country?.name },
    ];
    return <ViewDetails details={details} />
}

export default StudentDetails;