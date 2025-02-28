import express from 'express';
import routes from '../routes';
import {
  findProjects,
  enrollProject,
  getProjectQuestion,
  getProject,
  findProjectsByPopularity,
  updateProjectViewCnt,
  getProjectQna,
  postProjectQna,
  removeProjectQna,
  updateProjectQna,
  searchProject,
  enrollProjectCart,
  deleteProjectCart,
  updateProject,
  projectDeadline
} from '../controllers/projectController';
import { enrollApplicant } from '../controllers/applicantController';
import { onlyPrivate, uploadProjectImage } from '../middlewares';

const projectRouter = express.Router();

projectRouter.get(routes.popularity, findProjectsByPopularity);
projectRouter.get(routes.home, findProjects);
projectRouter.post(routes.home, onlyPrivate, uploadProjectImage, enrollProject);
projectRouter.get(routes.projectId, getProject);
projectRouter.get(`${routes.projectId}${routes.question}`, getProjectQuestion);
projectRouter.post(
  `${routes.projectId}${routes.applicants}`,
  onlyPrivate,
  enrollApplicant
);
projectRouter.put(
  `${routes.projectId}`,
  onlyPrivate,
  uploadProjectImage,
  updateProject
);
projectRouter.patch(
  `${routes.projectId}${routes.viewCnt}`,
  updateProjectViewCnt
);

// qna
projectRouter.get(`${routes.projectId}${routes.qna}`, getProjectQna);
projectRouter.post(
  `${routes.projectId}${routes.qna}`,
  onlyPrivate,
  postProjectQna
);
projectRouter.delete(
  `${routes.projectId}${routes.qna}`,
  onlyPrivate,
  removeProjectQna
);
projectRouter.patch(
  `${routes.projectId}${routes.qna}`,
  onlyPrivate,
  updateProjectQna
);

// search
projectRouter.post(`${routes.search}`, searchProject);

// cart
projectRouter.post(
  `${routes.projectId}${routes.cart}`,
  onlyPrivate,
  enrollProjectCart
);
projectRouter.delete(
  `${routes.projectId}${routes.cart}`,
  onlyPrivate,
  deleteProjectCart
);

// deadline
projectRouter.patch(
  `${routes.projectId}${routes.deadline}`,
  onlyPrivate,
  projectDeadline
);

/**
 * @swagger
 * /projects/{projectId}/deadline:
 *   patch:
 *     summary: project 모집마감
 *     tags: [Project]
 *     parameters:
 *        - in: path
 *          name: projectId
 *          schema:
 *            type: integer
 *            example: 3
 *     responses:
 *        200:
 *            schema:
 *               type: boolean
 *               example: true
 */

/**
 * @swagger
 * /projects/{projectId}/cart:
 *    delete:
 *        summary: project 즐겨찾기 삭제
 *        tags: [ProjectCart]
 *        parameters:
 *             - in: path
 *               name: projectId
 *               schema:
 *                  type: integer
 *                  example: 3
 *        responses:
 *            200:
 *               schema:
 *                  type: boolean
 *                  example: true
 */

/**
 * @swagger
 * /projects/{projectId}/cart:
 *    post:
 *        summary: project 즐겨찾기
 *        tags: [ProjectCart]
 *        parameters:
 *             - in: path
 *               name: projectId
 *               schema:
 *                  type: integer
 *                  example: 3
 *        responses:
 *            200:
 *               schema:
 *                  type: boolean
 *                  example: true
 */

/**
 * @swagger
 * /projects/search:
 *    post:
 *       summary: 검색 결과에 따른 projects
 *       tags: [Project]
 *       parameters:
 *          - in: body
 *            name: location과 keywords
 *            schema:
 *               type: object
 *               properties:
 *                  keywords:
 *                      type: array
 *                      items:
 *                          type: integer
 *                      example: [2,5,8]
 *          - in: query
 *            name: term
 *            schema:
 *                type: string
 *                example: "검색어"
 *          - in: query
 *            name: location
 *            schema:
 *                type: integer
 *                example: 2
 *       responses:
 *          200:
 *              description: 검색 결과에 따른 projects
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Project'
 *                      example: [
 *                           {
 *                             "projectId": 4,
 *                             "title": "신한 해커톤 참가자를 모집합니다.",
 *                             "content": "열심히 할 분을 찾습니다!",
 *                             "role": 101,
 *                             "step": 1,
 *                             "location": 2,
 *                             "thumbnailImage": null,
 *                             "attachFile": "",
 *                             "viewCnt": 0,
 *                             "createAt": "2019-11-13T13:53:46.000Z",
 *                             "userId": 1,
 *                             "projectCarts": []
 *                           },
 *                           {
 *                             "projectId": 1,
 *                             "title": "해커톤 팀원 모집",
 *                             "content": "2019 yapp 해커톤에 참여하실 분들 구합니다. ",
 *                             "role": 3,
 *                             "step": null,
 *                             "location": null,
 *                             "thumbnailImage": null,
 *                             "attachFile": "",
 *                             "viewCnt": 0,
 *                             "createAt": "2019-11-13T13:45:30.000Z",
 *                             "userId": 1,
 *                             "projectCarts": [
 *                               {
 *                                 "id": 1,
 *                                 "title": "해커톤 팀원 모집",
 *                                 "projectId": 1,
 *                                 "userId": 1
 *                               }
 *                             ]
 *                           }
 *                         ]
 *
 *
 */

/**
 * @swagger
 * /projects/{projectId}/qna:
 *   patch:
 *      summary: 해당 project에 대한 qna 수정
 *      tags: [Project]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *                type: integer
 *                example: 1
 *          - in: body
 *            name: projectQnaId
 *            schema:
 *                type: object
 *                properties:
 *                    projectQnaId:
 *                        type: integer
 *                    content:
 *                        type: string
 *                example: {"projectQnaId": 3, "content": "Qna 수정하기!"}
 *
 *      responses:
 *          200:
 *              schema:
 *                  type: boolean
 *                  example: true
 */

/**
 * @swagger
 * /projects/{projectId}/qna:
 *   delete:
 *      summary: 해당 project에 대한 qna 삭제
 *      tags: [Project]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *                type: integer
 *                example: 1
 *          - in: body
 *            name: projectQnaId
 *            schema:
 *                type: object
 *                properties:
 *                    projectQnaId:
 *                        type: integer
 *                example: {"projectQnaId": 3}
 *
 *      responses:
 *          200:
 *              schema:
 *                  type: boolean
 *                  example: true
 */

/**
 * @swagger
 * /projects/{projectId}/qna:
 *    post:
 *       summary: 해당 project에 대한 qna 등록
 *       tags: [Project]
 *       parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *                type: integer
 *                example: 1
 *          - in: body
 *            name: Qna 정보
 *            schema:
 *                type: object
 *                properties:
 *                    content:
 *                        type: string
 *                    parentId:
 *                        type: integer
 *       responses:
 *          200:
 *              schema:
 *                 type: boolean
 *                 example: true
 */

/**
 * @swagger
 * definitions:
 *    ProjectQna:
 *                      type: object
 *                      properties:
 *                          projectQnaId:
 *                             type: interger
 *                          content:
 *                             type: string
 *                          parentId:
 *                             type: integer
 *                          userId:
 *                             type: integer
 *                          projectId:
 *                             type: integer
 *                          createAt:
 *                             type: date
 *                          answer:
 *                             type: array
 *                             items:
 *                                type: object
 *
 * example:
 *                            {
 *                              "projectQnaId": 1,
 *                              "content": "안녕하세요 프로젝트에 궁금한 점 남깁니다.",
 *                              "parentId": null,
 *                              "userId": 3,
 *                              "projectId": 1,
 *                              "createAt": "2019-11-16T09:08:04.000Z",
 *                              "answer": []
 *                            }
 */

/**
 * @swagger
 * /projects/{projectId}/qna:
 *    get:
 *      summary: 해당 프로젝트에 대한 qna
 *      tags: [Project]
 *      parameters:
 *        - in: query
 *          name: offset
 *          schema:
 *             type: integer
 *        - in: path
 *          name: projectId
 *          schema:
 *              type: integer
 *              example: 1
 *      responses:
 *          200:
 *              description: 해당 프로젝트의 질문과 질문에 대한 답변 반환
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/ProjectQna'
 *                      example:
 *                            {
 *                              "projectQnaId": 1,
 *                              "content": "안녕하세요 프로젝트에 궁금한 점 남깁니다.",
 *                              "parentId": null,
 *                              "userId": 3,
 *                              "projectId": 1,
 *                              "createAt": "2019-11-16T09:08:04.000Z",
 *                              "answer": [
 *                                  {
 *                                      "projectQnaId": 1,
 *                                       "content": "네 무엇이든 물어보세요!",
 *                                       "parentId": 1,
 *                                       "userId": 1,
 *                                       "projectId": 1,
 *                                       "createAt": "2019-11-16T09:08:04.000Z",
 *                                       "answer": null
 *                                  }
 *                              ]
 *                            }
 */

/**
 * @swagger
 * /projects/{projectId}/viewCnt:
 *    patch:
 *      summary: 해당 프로젝트에 대한 조회수 증가
 *      tags: [Project]
 *      parameters:
 *          - in: path
 *            name: projectId
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *        200:
 *          description: 해당 프로젝트에 대한 질문
 *          schema:
 *            type: boolean
 *          example: true
 *
 */

/**
 * @swagger
 * /projects/{projectId}/question:
 *   get:
 *     summary: 해당 프로젝트에 대한 질문 반환
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 해당 프로젝트에 대한 질문
 *         schema:
 *           type: object
 *           properties:
 *              interviewQuestions:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                      sn:
 *                          type: integer
 *                      content:
 *                          type: string
 *                      example : {sn: 1, content: '일주일에 1회 시간내서 참여 가능하신가요?'}
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 모집글 작성
 *     tags: [Project]
 *     parameters:
 *        - in: body
 *          name: 프로젝트 정보
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  role:
 *                      type: integer
 *                  step:
 *                      type: integer
 *                  location:
 *                      type: integer
 *                  thumbnailImage:
 *                      type: string
 *                  expectedPeriod:
 *                      type: integer
 *                  interviewQuestions:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              content:
 *                                  type: string
 *                              role:
 *                                  type: integer
 *                          example: {"content":"참여할 것입니까?", "role": 1}
 *                  keywords:
 *                      type: array
 *                      items:
 *                          type: integer
 *                      example: [1,2,3]
 *
 *          example: {
 *              title: '안녕하세요 타이틀입니다',
 *              content: '안녕하세요 내용입니다.',
 *              role: 5,
 *              step: 1,
 *              expectedPeriod: 1,
 *              location: 2,
 *              thumbnailImage: 'http://ncloud'
 *          }
 *     responses:
 *       200:
 *         description: 모집글 작성 성공
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * tags:
 *    name: Applicant
 */

/**
 * @swagger
 * /projects/{projectId}/applicants:
 *   post:
 *     summary: 해당 프로젝트에 지원하기
 *     tags: [Applicant]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *         example: 1
 *       - in: body
 *         name: role, portfolios, answers
 *         schema:
 *             type: object
 *             properties:
 *               role:
 *                   type: integer
 *               portfolios:
 *                   type: array
 *                   items:
 *                      type: integer
 *                   example: [1, 2]
 *               answers :
 *                   type : array
 *                   items:
 *                     type: object
 *                     properties:
 *                         sn:
 *                             type: integer
 *                         content:
 *                             type: string
 *                     example: { "content": "네 참여할 수 있습니다." }
 *     responses:
 *       200:
 *         description: Project detail
 *         schema:
 *           type: boolean
 *         example: true
 */

/**
 * @swagger
 * /projects/{projectId}:
 *   patch:
 *     summary: Project update
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *       - in: body
 *         name: project 정보
 *         schema:
 *            type: object
 *            properties:
 *               title:
 *                  type: string
 *                  example: "프로젝트 제목"
 *               content:
 *                  type: string
 *                  example: '프로젝트 내용'
 *               role:
 *                  type: integer
 *               step:
 *                  type: integer
 *               location:
 *                  type: integer
 *               expectedPeriod:
 *                  type: integer
 *               currentMember:
 *                  type: integer
 *               thumbnailImage:
 *                  type: string
 *               keywords:
 *                  type: array
 *                  items:
 *                     type: integer
 *                     example: 1,2,3
 *               interviewQuestions:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                        content:
 *                           type: string
 *                        role:
 *                           type: integer
 *     responses:
 *       200:
 *         description: Project update
 *         schema:
 *            type: object
 *            properties:
 *               projectId:
 *                  type: integer
 *
 *
 */

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Returns Project detail
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Project detail
 *         schema:
 *           type: object
 *           properties:
 *              projectId:
 *                  type: integer
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              thumbnailImage:
 *                  type: string
 *              attachFile:
 *                  type: string
 *              role:
 *                  type: integer
 *              expectedPeriod:
 *                  type: integer
 *              viewCnt:
 *                  type: integer
 *              createAt:
 *                  type: date
 *              userId:
 *                  type: string
 *              projectQnas:
 *                  type: array
 *                  items:
 *                     $ref: '#/definitions/ProjectQna'
 */

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 * definitions:
 *   Project:
 *     type: object
 *     properties:
 *       projectId:
 *         type: integer
 *         description: ObjectID
 *       title:
 *         type: string
 *         description: 제목
 *       content:
 *         type: string
 *         description: 내용
 *       role:
 *          type: integer
 *       expectedPeriod:
 *          type: integer
 *       thumbnailImage:
 *         type: string
 *       attachFile:
 *          type: string
 *       viewCnt:
 *          type: integer
 *       createAt:
 *          type: date
 */

/**
 * @swagger
 * /projects/popularity:
 *   get:
 *     summary: 메인페이지 인기 프로젝트 limit 6개 불러오기(조회순)
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Project list
 *         schema:
 *           type: object
 *           properties:
 *             project:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Project'
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: 메인페이지 프로젝트 limit 12개 불러오기
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Project list
 *         schema:
 *           type: object
 *           properties:
 *             projects:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Project'
 */

export default projectRouter;
