import App from "@/Layouts/App";
import React from "react";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";

export default function Show(props) {
    const { auth } = usePage().props;
    const { user, chats } = props;
    const { data, setData, reset, errors, post } = useForm({ message: "" });
    const submitHandler = (event) => {
        event.preventDefault();
        post(route("chat.store", user.username), {
            onSuccess: () => {
                reset("message");
            },
        });
    };
    return (
        <div>
            <Head title={`Chat with ${user.name}`}></Head>
            <div className="flex flex-col justify-between h-screen">
                <div className="border-b p-4">
                    <h1 className="font-semibold">{user.name}</h1>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                    {chats.length ? (
                        chats.map((chat) => (
                            <div
                                className={`flex text-sm ${
                                    auth.user.id === chat.sender_id
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                                key={chat.id}
                            >
                                <div
                                    className={`w-auto p-4 rounded-xl ${
                                        auth.user.id === chat.sender_id
                                            ? "bg-green-100 text-green-900"
                                            : "bg-gray-100 text-gray-900"
                                    }`}
                                >
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">
                            Start chat with someone . . .
                        </div>
                    )}
                </div>
                <div className="border-t py-2">
                    <form onSubmit={submitHandler}>
                        <input
                            value={data.message}
                            onChange={(event) =>
                                setData({
                                    ...data,
                                    message: event.target.value,
                                })
                            }
                            type="text"
                            autoComplete={"off"}
                            placeholder="Start typing . . . "
                            name="message"
                            id="message"
                            className="form-text w-full focus:outline-none focus:border-0 focus:ring-0 border-0"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} />;
