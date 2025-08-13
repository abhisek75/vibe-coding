import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";

interface Props{
    projectId: string;
};

export const MessageForm =({ projectId }: Props ) => {
    return(
        <div>
            Message Form
        </div>
    );
};