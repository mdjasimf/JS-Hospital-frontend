"use client";

type TParams = {
  params: {
    doctorId: string;
  };
};
const DoctorUpdatePage = ({ params }: TParams) => {
  console.log(params);
  return (
    <div>
      <h1>Doctor Update</h1>
    </div>
  );
};

export default DoctorUpdatePage;
