import {
  VStack,
  Heading,
  Flex,
  useToast,
  Stack,
  Button,
  Input,
  FormLabel,
  Center,
  chakra,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import * as faceapi from "face-api.js";
import { useRouter } from "next/router";

export default function ExamPage() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [result, setResult] = useState("");
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const router = useRouter();

  const getExam = useQuery({
    queryKey: ["examPage"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/v1/student/take-exam", {
        params: {
          exam_id: router.isReady && router.query.exam_id,
        },
      }),
  });

  function handleModels() {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);

    document.body.append(canvas);
    canvas.style.position = "absolute";
    canvas.style.bottom = "2rem";
    canvas.style.right = "2rem";
    canvas.style.width = 250;
    canvas.style.height = 250;

    const displaySize = {
      width: 250,
      height: 250,
    };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      console.log(detections);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 1000);
  }

  useEffect(() => {
    console.log("rendering");
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();

    navigator.getUserMedia(
      { video: {} },
      (stream) => (videoRef.current.srcObject = stream),
      (err) => console.log(err)
    );

    videoRef.current.addEventListener("play", handleModels);
    return () => videoRef.current.removeEventListener("play", handleModels);
  }, []);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    let correctAnswers = 0;
    const questions = getExam.data?.data?.questions;
    questions.map(
      (item, index) =>
        item.correctOptionIndex === parseInt(Object.values(values)[index]) &&
        correctAnswers++
    );
    setResult((correctAnswers / questions.length) * 100 + "%");
  }

  return result !== "" ? (
    <Center h={"100vh"} w="full" gap="2rem" flexDir={"column"}>
      <VStack rounded={"2rem"} p="2rem" bg="prim">
        <Heading color="white">Your Result is</Heading>
        <Heading color="white">{result}</Heading>
      </VStack>
      <Link href="/dashboard">Back To Dashboard</Link>
    </Center>
  ) : (
    <VStack
      align={"start"}
      w="full"
      p="2rem"
      spacing={"3rem"}
      pos={"relative"}
      h="100vh"
    >
      <Heading>Exam</Heading>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={"3rem"}
        align={"start"}
        id="examForm"
      >
        {!getExam?.data?.data?.questions ? (
          <Spinner />
        ) : (
          getExam.data?.data?.questions?.map((question, index) => (
            <VStack
              key={question.questionText}
              spacing={"1rem"}
              align={"start"}
            >
              <Heading fontSize={"sm"} textAlign={"left"}>
                {question.questionText}
              </Heading>
              <RadioGroup>
                <Stack direction={"row"}>
                  <Radio {...register(`A${index + 1}`)} value="0">
                    {question.options[0]}
                  </Radio>
                  <Radio {...register(`A${index + 1}`)} value="1">
                    {question.options[1]}
                  </Radio>
                  <Radio {...register(`A${index + 1}`)} value="2">
                    {question.options[2]}
                  </Radio>
                  <Radio {...register(`A${index + 1}`)} value="3">
                    {question.options[3]}
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          ))
        )}
        <Button type="submit">Submit</Button>
      </VStack>
      <chakra.video
        width={250}
        height={250}
        rounded={"2rem"}
        position={"absolute"}
        bottom={"2rem"}
        right={"2rem"}
        objectFit={"cover"}
        ref={videoRef}
        muted
        autoPlay
      ></chakra.video>
    </VStack>
  );
}
