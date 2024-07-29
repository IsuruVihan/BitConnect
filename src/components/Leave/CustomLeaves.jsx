import {Pie} from "react-chartjs-2";
import React from "react";

const CustomLeaves = ({casualLeaves}) => {
    return (
        <div className="p-8 border-1 rounded-md shadow-md">
            <div className="mb-4">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Casual Leaves</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Pie
                    redraw={false}
                    data={{
                        labels: ["Taken", "Remaining"],
                        datasets: [
                            {
                                label: 'No. of leaves',
                                data: [10 - casualLeaves, casualLeaves],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default CustomLeaves;