import React from "react";

const SelectedCourseBody = ({quiz, setQuiz, selectedCourse}) => {
	return (
		<div className="mt-4 sm:grid sm:grid-cols-3 gap-x-6">
			<div className="sm:col-span-2">
				<div className="p-2 text-center font-semibold text-gray-500 rounded shadow">
					Course content
				</div>
				<iframe
					src={selectedCourse.pdfUrl}
					title="PDF Viewer"
					className="w-full xl:h-[65vh] lg:h-[58vh] md:h-[53vh] sm:h-[52vh] mt-4"
				/>
			</div>
			<div className="sm:mt-0 mt-4">
				<div className="p-2 mb-4 text-center font-semibold text-gray-500 rounded shadow">
					Questions
				</div>
				<div className="xl:h-[65vh] lg:h-[58vh] md:h-[53vh] sm:h-[52vh] overflow-y-auto">
					{quiz.map((q, idx) => {
						return (
							<fieldset className="mb-8 mr-4" key={idx}>
								<legend className="font-semibold text-gray-900">{idx + 1}. {q.question}</legend>
								<div className="mt-2 border-t border-gray-200">
									{q.answers.map((answer, idx) => (
										<div key={idx} className="relative flex items-start py-1 pl-4">
											<div className="min-w-0 flex-1 text-sm leading-6">
												<label htmlFor={`person-${answer.id}`} className="select-none text-gray-900">
													{answer.text}
												</label>
											</div>
											<div className="ml-3 flex h-6 items-center">
												<input
													id={`answer-${idx}`}
													name={`answer-${idx}`}
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
													disabled={selectedCourse.completed}
													checked={answer.checked}
													onChange={(e) => {
														const updatedQuizObj = {
															id: q.id,
															question: q.question,
															answers: q.answers.map((qu) => {
																if (qu.id === answer.id)
																	return {id: qu.id, text: qu.text, checked: e.target.checked};
																else return {id: qu.id, text: qu.text, checked: qu.checked};
															}),
														};
														const otherQuizObjs = quiz.filter(qui => qui.id !== q.id);
														const updatedQuizzes = [updatedQuizObj, ...otherQuizObjs];
														updatedQuizzes.sort(
															(a, b) => parseInt(a.id) - parseInt(b.id)
														);
														setQuiz(updatedQuizzes);
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</fieldset>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SelectedCourseBody;